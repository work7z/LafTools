//go:build !windows
// +build !windows

// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 27 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
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

package pty

import (
	"io"
	"laftools-go/core/log"
	"net/http"
	"os"
	"os/exec"
	"syscall"
	"unsafe"

	"github.com/gorilla/websocket"
	"github.com/kr/pty"
)

var shared_term_inst_map = make(map[string]*os.File)

func init_tty(w http.ResponseWriter, r *http.Request, conn *websocket.Conn) (*exec.Cmd, *os.File) {
	log.Ref().Debug("remoteaddr", r.RemoteAddr)

	var commandPath = "/bin/bash"
	cmd := exec.Command(commandPath, "-l")
	cmd.Env = append(os.Environ(), "TERM=xterm")

	tty, err := pty.Start(cmd)
	var token = r.URL.Query().Get("Token")
	var prev_tty = shared_term_inst_map[token]
	if prev_tty != nil {
		//prev_tty.Close()
	}
	shared_term_inst_map[token] = tty
	if err != nil {
		log.Ref().Error("Unable to start pty/cmd")
		conn.WriteMessage(websocket.TextMessage, []byte(err.Error()))
		return nil, nil
	}
	return cmd, tty
}

// term request
func InternalHandleTermWS(w http.ResponseWriter, r *http.Request, conn *websocket.Conn) {
	log.Ref().Info("remoteaddr" + r.RemoteAddr)

	cmd, tty := init_tty(w, r, conn)

	if cmd == nil || tty == nil {
		return
	}

	defer func() {
		cmd.Process.Kill()
		cmd.Process.Wait()
		tty.Close()
		conn.Close()
	}()

	go func() {
		for {
			buf := make([]byte, 1024)
			read, err := tty.Read(buf)
			if err != nil {
				conn.WriteMessage(websocket.TextMessage, []byte(err.Error()))
				log.Ref().Error("Unable to read from pty/cmd")
				return
			}
			conn.WriteMessage(websocket.BinaryMessage, buf[:read])
		}
	}()

	for {
		//messageType
		_, reader, err := conn.NextReader()
		if err != nil {
			log.Ref().Error("Unable to grab next reader")
			return
		}

		//l.Info("Message Type", messageType)
		copied, err := io.Copy(tty, reader)
		if err != nil {
			log.Ref().Errorf("Error after copying %d bytes", copied)
			cmd, tty = init_tty(w, r, conn)
		} else {
			log.Ref().Info("Copied bytes " + string(copied))
		}
	}
}

func InternalHandleResize(inst_OptWSRequest OptWSRequest, token string) {
	log.Ref().Debug("handling the opt resize event...", inst_OptWSRequest)
	var tty = shared_term_inst_map[token]
	log.Ref().Debugf("Token is " + token)
	if tty != nil {
		log.Ref().Debug("has the tty value")
		resizeMessage := windowSize{}
		resizeMessage.Cols = inst_OptWSRequest.Cols
		resizeMessage.Rows = inst_OptWSRequest.Rows
		// log.Ref().Debug("resizeMessage", resizeMessage)
		log.Ref().Info("Resizing terminal")
		_, _, errno := syscall.Syscall(
			syscall.SYS_IOCTL,
			tty.Fd(),
			syscall.TIOCSWINSZ,
			uintptr(unsafe.Pointer(&resizeMessage)),
		)
		if errno != 0 {
			log.Ref().Error(syscall.Errno(errno))
			log.Ref().Error("Unable to resize terminal")
		}
	}
}
