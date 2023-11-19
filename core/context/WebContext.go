// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 7 Oct 2023
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

package context

import (
	"encoding/json"
	"errors"
	"laftools-go/core/nocycle"
	"laftools-go/core/translation"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// SKIP_DOT

type WebContext struct {
	config            *WebContextConfig
	GinContext        *gin.Context
	OverwriteUserLang string
	JsonMode          bool
}

func NewWC(c *gin.Context) WebContext {
	return WebContext{
		JsonMode:   false,
		GinContext: c,
		config: &WebContextConfig{
			HTTPHeaders: c.Request.Header,
		},
	}
}

func NewWCFromSystemDefault() (*WebContext, error) {
	b, err := NewWCFromJSON(`{"HTTPHeaders":{"` + nocycle.HEADER_LANGUAGE + `":["` + nocycle.SystemUserLanguage + `"]}}`)
	return b, err
}

func (wc *WebContext) IsJSONMode() bool {
	return wc.GinContext == nil
}

type WebContextConfig struct {
	HTTPHeaders http.Header
}

func (wc *WebContext) GetHeaderValue(key string) string {
	if wc.GinContext == nil {
		// find key in wc.config.HTTPHeaders in case-insensitive mode
		key = strings.ToLower(key)
		for k, v := range wc.config.HTTPHeaders {
			if strings.ToLower(k) == key {
				if len(v) != 0 {
					return v[0]
				}
			}
		}
		return ""
	} else {
		return wc.GinContext.GetHeader(key)
	}
}

func (wc *WebContext) ToConfigJSON() (string, error) {
	// marshal wc as string
	c_json, err := json.Marshal(WebContextConfig{
		HTTPHeaders: wc.GinContext.Request.Header,
	})
	if err != nil {
		return "", errors.New("We encountered JSON marshal issue when creating WebContext from JSON string." + err.Error())
	}
	return string(c_json), nil
}
func NewWCFromJSON(c_json string) (*WebContext, error) {
	// unmarhsal c_json to WebContext
	var config WebContextConfig
	err := json.Unmarshal([]byte(c_json), &config)
	if err != nil {
		return nil, errors.New("We encountered JSON unmarshal issue when creating WebContext from JSON string." + err.Error())
	}
	return &WebContext{
		config:   &config,
		JsonMode: true,
	}, nil
}

func (wc *WebContext) GetUserID() string {
	return wc.GetHeaderValue(nocycle.HEADER_LOCAL_USER_ID)
}

func (wc *WebContext) GetUserLanguage() string {
	if wc.OverwriteUserLang != "" {
		return wc.OverwriteUserLang
	}
	if wc.JsonMode && wc.config != nil {
		return wc.GetHeaderValue(nocycle.HEADER_LANGUAGE)
	}
	if wc.GinContext == nil {
		return nocycle.SystemUserLanguage
	}
	userlang := wc.GetHeaderValue(nocycle.HEADER_LANGUAGE)
	if userlang == "" {
		userlang = nocycle.SystemUserLanguage
	}
	return userlang
}

func (wc *WebContext) GetHeaderClientToken() string {
	token := strings.TrimSpace(wc.GetHeaderValue(nocycle.HEADER_LOCAL_USER_TOKEN))
	return token
}

func (wc *WebContext) Dot(id string, enText string, arg ...interface{}) string {
	userlang := wc.GetUserLanguage()
	return translation.TraFromWeb(userlang).Dot(id, enText, arg)
}
