package handlers

import (
	"laftools-go/core/handlers/context"
	"laftools-go/core/handlers/middleware"
	"laftools-go/core/log"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(c *gin.Context) {
	fullPath := c.FullPath()
	log.Ref().Debug("full path: ", fullPath)
	webContext := &context.WebContext{GinContext: c}
	headerClientToken := webContext.GetHeaderClientToken()

	isThatPassable := middleware.Auth(headerClientToken, fullPath)
	if !isThatPassable {
		log.Ref().Warn("Invalid token from client: ", headerClientToken)
		ErrLa2(c, "INVALID_TOKEN_ERROR")
		return
	} else {
		c.Next()
	}

}
