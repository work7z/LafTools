// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Mon, 20 Nov 2023
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
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/gin-gonic/gin"
)

var url_feProxyPath = "http://localhost:5173"

func Proxy_To_FE(c *gin.Context, prefix string) {
	allPath := c.Request.URL.Path
	// read the file in feAppDir and pipe its content into c
	subFilePath := strings.Replace(allPath, prefix, "", 1)
	remoteFullPath := url_feProxyPath + subFilePath

	r := c.Request
	w := c.Writer
	proxy := NewSingleHostReverseProxy(remoteFullPath)
	r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))

	proxy.ServeHTTP(w, r)
}

func NewSingleHostReverseProxy(target string) *httputil.ReverseProxy {
	targetUrl, _ := url.Parse(target)
	return &httputil.ReverseProxy{Director: func(r *http.Request) {
		r.URL.Host = targetUrl.Host
		r.URL.Scheme = targetUrl.Scheme
		r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))
		r.Host = targetUrl.Host
	}}
}
