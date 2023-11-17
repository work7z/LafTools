// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 7 Nov 2023
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

package middleware

import (
	"codegen-go/core/log"
	"codegen-go/core/nocycle"
	"encoding/json"
	"errors"
	"io/ioutil"
	"os"
	"os/exec"
	"path"
	"strconv"
	"sync"
	"sync/atomic"
	"time"

	"github.com/gin-gonic/gin"
)

// var IsNodeProcessOn = false

type NodeReq struct {
	Id          string
	Lang        string
	Type        string
	InputValue  interface{}
	CallbackURL string // optional, if require the node feedback then please provide this link
}

type NodeRes struct {
	Id          string
	Lang        string
	Type        string
	OutputValue interface{}
}

// provide GetUID in NodeRes, which is return Id+Lang
func (nr *NodeRes) GetUID() string {
	return nr.Id + nr.Lang
}
func (nr *NodeReq) GetUID() string {
	return nr.Id + nr.Lang
}

type NodeConfig struct {
	Lang string
}

// node.js will consumer the values in Ref_NodeReqSet
// var Ref_NodeReqSet SMap = SMap{
// 	Map: make(map[string]*NodeReq),
// }

var Ref_Chan_NodeReq = make(chan *NodeReq)

// var Ref_Chan_NodeRes = make(chan *NodeRes)

var Ref_WaitResMap = make(map[string]chan *NodeRes)
var Lck_WaitKVMap = &sync.Mutex{}
var Ref_CloseResMap = make(map[string]chan int)
var Lck_CloseKVMap = &sync.Mutex{}

func ReceiveNodeReq(uid string) (*NodeRes, error) {
	if nocycle.HTTP_PORT_ONCE_SET == 0 {
		log.Ref().Panic("Http port has not been setup, please firstly launch the server at first.")
	}

	log.Ref().Debug("ReadNodeResByUId: before -> ", uid)

	var c *NodeRes

	var hasResReceived = false
	for {
		Lck_WaitKVMap.Lock()
		crtWaitRef, hasWait := Ref_WaitResMap[uid]
		Lck_WaitKVMap.Unlock()
		if !hasWait {
			break
		}
		select {
		case c = <-crtWaitRef:
			log.Ref().Debug("Received Wait Res Map: after -> ", uid)
			hasResReceived = true
		case _ = <-Chan_NewReqForNodeLooper:
			log.Ref().Debug("wake up a service in receive")
		}
		if hasResReceived {
			break
		}
	}

	for {
		var shoudBreak = false
		Lck_CloseKVMap.Lock()
		crtChan, hasChan := Ref_CloseResMap[uid]
		if !hasChan {
			break
		}
		Lck_CloseKVMap.Unlock()

		select {
		case crtChan <- 1:
		default:
			// if there's no receiver to listen on it, then we can quit it can safely exit
			Lck_CloseKVMap.Lock()
			close(Ref_WaitResMap[uid])
			delete(Ref_WaitResMap, uid)
			shoudBreak = true
			Lck_CloseKVMap.Unlock()
		}
		if shoudBreak {
			break
		}
	}

	Lck_WaitKVMap.Lock()
	if Ref_WaitResMap[uid] != nil {
		close(Ref_WaitResMap[uid])
		delete(Ref_WaitResMap, uid)
	}
	Lck_WaitKVMap.Unlock()

	log.Ref().Debug("finally reutrn with uid", uid)

	return c, nil
}

// and return value here if has any response
// var Ref_NodeResSet ResMap = ResMap{
// 	Map: make(map[string]chan NodeRes),
// }

var randomSubConsumer string = nocycle.GetRandomString(5)
var randomFileName string = nocycle.GetRandomString(10)
var idx = 0

var Unfinished_NodeReqChan = make(map[string]*NodeReq)
var Lock_tmp_NodeReqChan = &sync.Mutex{}
var Chan_NewReqForNodeLooper = make(chan int)

// provide a map[string] channel for NodeRes. Once the NodeRes has value to be returned, so that I can read it by waiting for
// the channel
var allLangMap = []string{
	"zh_CN", "zh_HK", "en_US",
}

var cacheMapForRes = map[string]*NodeRes{}
var lock_cacheMapForRes = &sync.Mutex{}

func BIO_SendReqToNodeProcess(nodeReq *NodeReq, shouldCacheRes bool, returnValue interface{}) (*NodeRes, error) {
	uid := nodeReq.GetUID()
	if shouldCacheRes && !nocycle.IsDevMode() {
		prev := cacheMapForRes[uid]
		if prev != nil {
			return prev, nil
		}
	}
	err := SendNodeReq(nodeReq)
	if err != nil {
		return nil, err
	}
	r, e := ReceiveNodeReq(uid)
	if shouldCacheRes {
		lock_cacheMapForRes.Lock()
		defer lock_cacheMapForRes.Unlock()
		// convert a.OutputValue as jsonstr
		jsonStr := r.OutputValue
		e := nocycle.AssignJSONToObj(jsonStr, returnValue)
		if e != nil {
			return nil, e
		}
		r.OutputValue = returnValue
		cacheMapForRes[uid] = r
	}
	return r, e
}

func SendNodeReq(nodeReq *NodeReq) error {

	// ensure Id,Lang,Type is required in nodeReq, if no then return error
	if nodeReq.Id == "" || nodeReq.Lang == "" || nodeReq.Type == "" {
		return errors.New("Id,Lang,Type are required in nodeReq")
	}

	idx++
	checkNodeProcess(*nodeReq)

	// if Id is empty, then throw error
	if nodeReq.Id == "" {
		return errors.New("the Id is empty")
	}
	log.Ref().Debug("Sending the file for " + nodeReq.Lang + " -> " + nodeReq.Id)

	Lck_WaitKVMap.Lock()
	uid := nodeReq.GetUID()
	Ref_WaitResMap[uid] = make(chan *NodeRes)
	Lck_WaitKVMap.Unlock()

	// actually, it's ok when we don't proactively close it.
	Lck_CloseKVMap.Lock()
	Ref_CloseResMap[uid] = make(chan int)
	Lck_CloseKVMap.Unlock()

	// pipe into channel without wait
	Lock_tmp_NodeReqChan.Lock()
	Unfinished_NodeReqChan[uid] = nodeReq
	Lock_tmp_NodeReqChan.Unlock()

	// block waitng for websocket consume this operation
	var hasReqSent = false
	for {
		select {
		case Ref_Chan_NodeReq <- nodeReq:
			hasReqSent = true
		case _ = <-Chan_NewReqForNodeLooper:
			log.Ref().Debug("wake up a service in send")
		}
		if hasReqSent {
			break
		}
	}

	return nil
}

func getIncreaseLck() string {
	return path.Join(getConsumerDir(), "increase.lck")
}
func getResponseLck() string {
	return path.Join(getConsumerDir(), "response.lck")
}

// check node process lock
var lock_checkNodeProcessLock = &sync.Mutex{}
var Wait_NodeReadyWS = make(chan int)
var init_checkNodeProcessBefore bool = false
var atomicInt *int64 = new(int64)

func checkNodeProcess(config NodeReq) error {
	lock_checkNodeProcessLock.Lock()
	defer lock_checkNodeProcessLock.Unlock()
	if nocycle.HTTP_PORT_ONCE_SET == 0 {
		log.Ref().Panic("Http port has not been setup, please firstly manually invoke the server")
	}
	if init_checkNodeProcessBefore {
		return nil
	}
	init_checkNodeProcessBefore = true

	// this go routine only run once. Everytime it exit, we listen for if there's any new req in Unfinished_NodeReqChan
	go func() {
		cleanStuffBeforeNode()
		for {
			runNodeJS()
			log.Ref().Debug("[checkNode] sleeping")
			select {
			case Chan_NewReqForNodeLooper <- 1:
				log.Ref().Debug("someone is waking me up, now I'm gonna rerun node.js now. ")
			}
			log.Ref().Debug("[checkNode] waken up")
			DEV_WAKUP_TIMES++
		}
	}()

	return nil
}

func cleanStuffBeforeNode() {
	// clean stuff
	if nocycle.IsDebugMode {
		os.RemoveAll(getBaseDirAboveConsumer())
	}
	files, err := ioutil.ReadDir(getBaseDirAboveConsumer())
	if err != nil {
		log.Ref().Warn(err)
		return
	}
	for _, f := range files {
		// log.Ref().Debug("Deleting the file", f)
		// check if this file is modified a hour ago
		modTime, err2 := getModTime(path.Join(getBaseDirAboveConsumer(), f.Name()))
		if err2 != nil {
			log.Ref().Warn(err2)
		} else {
			if time.Now().UnixNano()-modTime > int64(time.Hour) {
				// delete this file
				os.RemoveAll(path.Join(getBaseDirAboveConsumer(), f.Name()))
			}
		}
	}
}

func runNodeJS() {
	log.Ref().Info("Launching Node Process for index.ts...")
	var cmd *exec.Cmd
	extArr := []string{}
	var mainProgram string
	if nocycle.IsDevMode() {
		mainProgram = "ts-node"
		extArr = append(extArr, "-T")
		extArr = append(extArr, nocycle.CodeGenGoRoot+"/sub/node/src/ws-index.ts")
		// mainProgram = "node"
		// extArr = append(extArr, nocycle.CodeGenGoRoot+"/sub/node/build/ws-index.js")
	} else {
		// TODO:
		mainProgram = "node"
		panic("not yet supported")
	}
	autoExitSeconds := "120"
	if nocycle.IsDevMode() {
		autoExitSeconds = DEV_EXIT_SECONDS
	}
	extArr = append(extArr, "--autoExitSeconds="+(autoExitSeconds))
	extArr = append(extArr, "--captureIn="+getConsumerDir())
	// safely increase atomicInt +1
	newIdx := atomic.AddInt64(atomicInt, 1)

	tmpInputConfigFile := path.Join(getConsumerDir(), "iptcfg-"+strconv.Itoa(int(newIdx))+".json")
	// write the config into tmpInputConfigFile
	configB, err := json.Marshal(gin.H{
		"WebSocketLink": "ws://127.0.0.1:" + strconv.Itoa(nocycle.HTTP_PORT_ONCE_SET),
		"NodeToken":     nocycle.NodeWSToken,
	})
	if err != nil {
		log.Ref().Warn(err)
	} else {
		err2 := ioutil.WriteFile(tmpInputConfigFile, configB, 0644)
		if err2 != nil {
			log.Ref().Error("tmpInputConfigFie err2 is ", runNodeJS)
			return
		}
	}

	extArr = append(extArr, "--input-config-file="+tmpInputConfigFile)
	// run
	cmd = exec.Command(mainProgram, extArr...)
	// directly show cmd here
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		log.Ref().Warn(err)
	} else {
		log.Ref().Debug("Completed running the process")
	}
}

func getModTime(filename string) (int64, error) {
	fileInfo, err := os.Stat(filename)
	if err != nil {
		return 0, err
	}
	return fileInfo.ModTime().UnixNano(), nil
}

func getBaseDirAboveConsumer() string {
	return nocycle.MkdirFileWithStr(nocycle.CodeGenGoRoot+"/sub/node/time-consumer")
}

func getConsumerDir() string {
	return nocycle.MkdirFileWithStr(path.Join(getBaseDirAboveConsumer(), "c-"+randomSubConsumer))
}

// atmoic int
