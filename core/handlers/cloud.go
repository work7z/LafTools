package handlers

import (
	"laftools-go/core/handlers/config"
	"strings"

	"github.com/gin-gonic/gin"
)

var url_cloudAPIPath = "https://laf-tools.com"

func cloudForwardAPI(c *gin.Context) {
	// reverse proxy to this request to https://laf-tools.com
	var prefix = config.CLOUD_URL_APP_CLOUD_PREFIX
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
