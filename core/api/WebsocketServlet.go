// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 19 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

package api

import (
	"encoding/json"
	"laftools-go/core/config"
	"laftools-go/core/log"
	"laftools-go/core/middleware"
	"laftools-go/core/nocycle"
	"laftools-go/core/ws"
	"path"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upGraderForDuplex = ws.GetUpgrader()

func getHeaderClientToken(c *gin.Context) string {
	return c.Query("lut")
}

func getPageId(c *gin.Context) string {
	return c.Query("pd")
}

func VerifyWSRequest(c *gin.Context) bool {
	nodeToken := c.Query("node-token")
	if nodeToken != "" {
		if nodeToken == nocycle.NodeWSToken {
			return true
		}
	}

	headerClientToken := getHeaderClientToken(c) // local account token
	_, item_f := config.GetItemByTokenDirectly(headerClientToken)
	return headerClientToken != "" && item_f
}

type SaveConnMark struct {
	wsConn    *websocket.Conn
	userToken string
}
type WsReq struct {
	Mtype string
	Value interface{}
}

// define a global variable to map token to ws
var GLOBAL_WS_MAP = make(map[string]map[string]*SaveConnMark)

// set a locker for GLOBAL_WS_MAP
var GLOBAL_WS_MAP_LOCKER = &sync.Mutex{}

func GetWSMarkByPageId(c *gin.Context) *SaveConnMark {
	GLOBAL_WS_MAP_LOCKER.Lock()
	defer func() {
		GLOBAL_WS_MAP_LOCKER.Unlock()
	}()
	m := GLOBAL_WS_MAP[c.GetHeader(nocycle.HEADER_LOCAL_USER_TOKEN)]
	if m == nil {
		return nil
	}
	return m[c.GetHeader(nocycle.HEADER_LOCAL_PAGE_ID)]
}
func GetWSMarkListByTokenId(c *gin.Context) map[string]*SaveConnMark {
	GLOBAL_WS_MAP_LOCKER.Lock()
	defer func() {
		GLOBAL_WS_MAP_LOCKER.Unlock()
	}()
	m := GLOBAL_WS_MAP[c.GetHeader(nocycle.HEADER_LOCAL_USER_TOKEN)]
	if m == nil {
		return nil
	}
	return m
}

func API_Node_getAllJobs(c *gin.Context) {
	if !VerifyWSRequest(c) {
		ErrLa2(c, "no permission")
		return
	}
	// get all jobs
	// reqSet := middleware.Ref_NodeReqSet.Map
	// OKLa(c, DoValueRes(reqSet))
}

var Lock_tmp_NodeWebsocket = &sync.Mutex{}

func API_Node_Websocket(c *gin.Context) {
	// upgrade GET request to websocket protocol
	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}

	defer ws.Close()
	// write hello for ws

	if !VerifyWSRequest(c) {
		ws.WriteJSON(DoValueResForWS(99, "INVALID_TOKEN", map[string]interface{}{
			"errors": "INVALID_TOKEN",
		}))
		return
	}

	Lock_tmp_NodeWebsocket.Lock()
	defer Lock_tmp_NodeWebsocket.Unlock()

	// select {
	// case middleware.Wait_NodeReadyWS <- 1:
	// 	log.Ref().Debug("cool, node consumer wait for the websocket")
	// default:
	// 	log.Ref().Debug("no one register this ready ws")
	// }

	log.Ref().Debug("received ws request")

	isQuit := false
	defer func() {
		isQuit = true
	}()

	// when websocket is ready, send all unfinished node req to it
	middleware.Lock_tmp_NodeReqChan.Lock()
	for _, v := range middleware.Unfinished_NodeReqChan {
		ws.WriteJSON(DoValueResForWS(0, "node_req", v))
	}
	middleware.Lock_tmp_NodeReqChan.Unlock()

	// listen to the channel once a new req is in
	go func() {
		for {
			if isQuit {
				break
			}
			// check if ws is closed
			if ws == nil {
				break
			}
			// when got new node req, then send it to ws
			c := <-middleware.Ref_Chan_NodeReq
			ws.WriteJSON(DoValueResForWS(0, "node_req", c))
		}
	}()

	for {
		log.Ref().Debug("continue to read message")

		_, message, err := ws.ReadMessage()
		if err != nil {
			log.Ref().Error(err)
			break
		}
		crtRes := &middleware.NodeRes{}
		json.Unmarshal(message, crtRes)
		log.Ref().Debug("received node res for ", crtRes.GetUID())
		uid := crtRes.GetUID()

		var anyAck = false
		var shouldContinue = false
		for {
			middleware.Lck_WaitResMap.Lock()
			crtWaitRes := middleware.Ref_WaitResMap[uid]
			middleware.Lck_WaitResMap.Unlock()
			if crtWaitRes == nil {
				log.Ref().Debug("skip nil map that might processed before")
				shouldContinue = true
				break
			}
			middleware.Lck_CloseKVMap.Lock()
			crtCloseRes, hasClose := middleware.Ref_CloseResMap[uid]
			if !hasClose {
				log.Ref().Debug("skip nil close map that might processed before")
				shouldContinue = true
				break
			}
			middleware.Lck_CloseKVMap.Unlock()

			select {
			case crtWaitRes <- crtRes:
				anyAck = true
			case _ = <-crtCloseRes:
				log.Ref().Debug("received close res request, so no need to be waiting for it")
				shouldContinue = true
			case _ = <-middleware.Chan_NewReqForNodeLooper:
				// do nothing
			}
			if anyAck {
				break
			}
		}
		if shouldContinue {
			continue
		}

		// delete unhandled errors
		middleware.Lock_tmp_NodeReqChan.Lock()
		delete(middleware.Unfinished_NodeReqChan, uid)
		middleware.Lock_tmp_NodeReqChan.Unlock()
	}
}

type HmrReloadConfig struct {
	Files []string
}

// post a job to Go/Node, then receive response from remote server
func API_Hmr_Reload(c *gin.Context) {
	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	configHmrFile := path.Join(nocycle.CodeGenGoRoot, "sub/web/src/init/hmr.json")
	var reloadConfig *HmrReloadConfig = &HmrReloadConfig{}
	if nocycle.IsFileExist(configHmrFile) {
		// unmarshal from configHmrFile
		str, _ := nocycle.ReadFileAsStr(configHmrFile)
		json.Unmarshal([]byte(str), reloadConfig)
		// check if each file is changed
		for _, _eachFile := range reloadConfig.Files {
			eachFile := path.Join(nocycle.CodeGenGoRoot, "sub/web/public", _eachFile)
			// get last timestamp
			// if changed, then send reload command to ws
			lastTimestamp, _ := nocycle.GetFileLastModifiedTimestamp(eachFile)
			go func() {
				for {
					crtTimestamp, _ := nocycle.GetFileLastModifiedTimestamp(eachFile)
					if crtTimestamp != lastTimestamp {
						lastTimestamp = crtTimestamp
						err := ws.WriteJSON((DoValueRes("changed")))
						if err != nil {
							return
						}
					}
					time.Sleep(time.Second * 1)
				}
			}()
		}
	}
	select {}
}

// post a job to Go/Node, then receive response from remote server
func API_PostJob_WebSocket(c *gin.Context) {
	// upgrade GET request to websocket protocol
	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	ws.WriteJSON(DoValueRes("Welcome to the Call API Service."))
}

func API_SYSTEM_WebSocket(c *gin.Context) {
	// upgrade GET request to websocket protocol
	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}

	defer ws.Close()
	// write hello for ws

	if !VerifyWSRequest(c) {
		ws.WriteJSON(DoValueResForWS(99, "INVALID_TOKEN", map[string]interface{}{
			"errors": "INVALID_TOKEN",
		}))
		return
	}

	headerClientToken := getHeaderClientToken(c) // local account token
	pageId := getPageId(c)
	if pageId == "" {
		ws.WriteJSON(DoValueResForWS(99, "NO_PAGE", map[string]interface{}{
			"errors": "NO_PAGE",
		}))
		return
	}

	setValueIntoGlobalWSMap := func(headerClientToken string, pageId string, value *SaveConnMark) {
		GLOBAL_WS_MAP_LOCKER.Lock()
		defer func() {
			GLOBAL_WS_MAP_LOCKER.Unlock()
		}()
		// Check if the first layer ID exists in the map
		if _, ok := GLOBAL_WS_MAP[headerClientToken]; !ok {
			// If not, create a new map for the first layer ID
			GLOBAL_WS_MAP[headerClientToken] = make(map[string]*SaveConnMark)
		}

		// Check if the second layer ID exists in the map
		if _, ok := GLOBAL_WS_MAP[headerClientToken][pageId]; ok {
			// If it exists, clean the previous record
			// check if wsConn exist
			if GLOBAL_WS_MAP[headerClientToken][pageId].wsConn != nil {
				GLOBAL_WS_MAP[headerClientToken][pageId].wsConn.Close()
			}
			delete(GLOBAL_WS_MAP[headerClientToken], pageId)
		}

		// Set the value into the map
		GLOBAL_WS_MAP[headerClientToken][pageId] = value
	}
	// set value into GLOBAL_WS_MAP, first layer id is headerClientToken, the second layer id is pageId, please check if it's nil and remember to clean prev record if have

	setValueIntoGlobalWSMap(headerClientToken, pageId, &SaveConnMark{
		userToken: headerClientToken,
		wsConn:    ws,
	})

	defer func() {
		GLOBAL_WS_MAP_LOCKER.Lock()
		defer func() {
			GLOBAL_WS_MAP_LOCKER.Unlock()
		}()
		// remove this pageId record
		delete(GLOBAL_WS_MAP[headerClientToken], pageId)
	}()

	log.Ref().Debug("received ws request")

	for {
		//读取ws中的数据
		_, message, err := ws.ReadMessage()
		if err != nil {
			break
		}
		crtReq := &WsReq{}
		json.Unmarshal(message, crtReq)
		var finValue interface{} = nil
		if crtReq.Mtype == "ping" {
			finValue = DoValueResForWS(0, "pong", "pong wor, ok jor.")
		}

		//写入ws数据
		if finValue == nil {
			finValue = DoValueResForWS(99, "unknown", "unknown wor, am i a joke to you?")
		}
		err = ws.WriteJSON(finValue)
		if err != nil {
			break
		}
	}
}
