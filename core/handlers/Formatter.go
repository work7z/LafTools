// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 22 Sep 2023
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

package handlers

import (
	"encoding/json"
	"errors"
	"laftools-go/core/log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CodeGenJSON struct {
	Data any
	c    *gin.Context
}

var jsonContentType = []string{"application/json; charset=utf-8"}

// Render (JSON) writes data with custom ContentType.
func (r CodeGenJSON) Render(w http.ResponseWriter) error {
	return writeJSON(r, w, r.Data)
}

// WriteJSON marshals the given interface object and writes it with custom ContentType.
func writeJSON(r CodeGenJSON, w http.ResponseWriter, obj any) error {
	writeContentType(w, jsonContentType)
	jsonBytes, err := json.Marshal(obj)
	if err != nil {
		return err
	}
	_, err = w.Write(jsonBytes)
	return err
}

func writeContentType(w http.ResponseWriter, value []string) {
	header := w.Header()
	if val := header["Content-Type"]; len(val) == 0 {
		header["Content-Type"] = value
	}
}
func (r CodeGenJSON) WriteContentType(w http.ResponseWriter) {
	writeContentType(w, jsonContentType)
}

const ST_ERROR = http.StatusBadRequest

func OKLa(c *gin.Context, obj GoResponseType) {
	if len(c.Errors) == 0 {
		c.Render(http.StatusOK, CodeGenJSON{Data: gin.H{
			"payload": obj,
		}, c: c})
	} else {
		log.Ref().Warn("Received an error while doing OKLa", c.Errors)
	}
}
func OKLa2(c *gin.Context, obj interface{}) {
	if len(c.Errors) == 0 {
		c.Render(http.StatusOK, CodeGenJSON{Data: gin.H{
			"payload": obj,
		}, c: c})
	} else {
		log.Ref().Warn("Received an error while doing OKLa2", c.Errors)
	}
}

func ErrLa(c *gin.Context, obj error) {
	c.Error(obj)
	c.AbortWithStatusJSON(200, gin.H{
		"errors": []string{
			obj.Error(),
		},
	})
}

func ErrLa2(c *gin.Context, str string) {
	ErrLa(c, errors.New(str))
}
