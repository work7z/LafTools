// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 26 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
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

package handlers

import (
	"encoding/json"
	"laftools-go/core/log"
	"laftools-go/core/project/base/pty"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// term ws
func HandleTermWS(c *gin.Context) {
	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	if !VerifyWSRequest(c) {
		returnInvalidWS(ws)
		return
	}

	w := c.Writer
	r := c.Request
	log.Ref().Infof("remoteaddr, %s", r.RemoteAddr)
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Ref().Error("Unable to upgrade connection", err)
		return
	}

	log.Ref().Info("Interact with ", r.URL.RawQuery)
	// concerto.Token

	if !VerifyWSRequest(c) {
		returnInvalidWS(ws)
		return
	}

	pty.InternalHandleTermWS(w, r, conn)
}

// opt ws
func HandleOptWS(c *gin.Context) {

	ws, err := upGraderForDuplex.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	if !VerifyWSRequest(c) {
		returnInvalidWS(ws)
		return
	}

	r := c.Request
	if !VerifyWSRequest(c) {
		returnInvalidWS(ws)
		return
	}
	log.Ref().Info("Interact with ", r.URL.RawQuery)
	defer ws.Close()
	for {
		log.Ref().Info("looped here, receiving the Message...")
		mt, message, err := ws.ReadMessage()
		if err != nil {
			log.Ref().Error("read:", err)
			break
		}
		log.Ref().Info("RECEIVED HERE: %s", string(message), mt)
		var inst_OptWSRequest pty.OptWSRequest
		json.Unmarshal(message, &inst_OptWSRequest)
		log.Ref().Info("inst_OptWSRequest -> ", inst_OptWSRequest)
		if strings.Compare(inst_OptWSRequest.Type, "resize") == 0 {
			var token = r.URL.Query().Get("Token")
			pty.InternalHandleResize(inst_OptWSRequest, token)
		}

	}
	log.Ref().Info("Ending read the Message")
}
