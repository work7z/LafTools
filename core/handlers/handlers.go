// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// LafTools Team - Ubuntu <work7z@outlook.com>
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
	"laftools-go/core/global"
	"laftools-go/core/handlers/config"
	"laftools-go/core/tools"
	"path"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.Use(gzip.Gzip(gzip.DefaultCompression))
	// all APIs needs to be authenticated except for openAPIs
	r.Use(authMiddleware)
	// root
	r.GET("/", func(c *gin.Context) {
		c.Redirect(302, config.CONFIG_URL_APP_FRONT_END_APP_PREFIX)
	})

	// app and static
	if tools.IsDevMode {
		// do nothing, this part will move to r.NoRoute part below.
	} else {
		feAppDir := global.GetFrontEndRootAppDir()
		feStaticDir := global.GetFrontEndStaticDir()
		r.Static(config.CONFIG_URL_APP_FRONT_END_APP_PREFIX, feAppDir)
		r.Static(config.CONFIG_URL_APP_FRONT_END_STATIC_PREFIX, feStaticDir)
		r.Static(config.CONFIG_URL_APP_FRONT_END_ASSETS_PREFIX, path.Join(feAppDir, "assets"))
	}

	// setup for SPA
	r.NoRoute(func(c *gin.Context) {
		fullPath := c.Request.RequestURI

		isCloudPrefix := strings.Index(fullPath, config.CLOUD_URL_APP_CLOUD_PREFIX) == 0
		isAppPreFix := strings.Index(fullPath, config.CONFIG_URL_APP_FRONT_END_APP_PREFIX) == 0
		isStaticPrefix := strings.Index(fullPath, config.CONFIG_URL_APP_FRONT_END_STATIC_PREFIX) == 0
		if isCloudPrefix {
			proxyToCloud(c)
			return
		}
		// if current env is dev mode, then we just proxy the request to the front-end server.
		if tools.IsDevMode {
			if isAppPreFix {
				proxyToDevFE(c, config.CONFIG_URL_APP_FRONT_END_APP_PREFIX)
				return
			} else if isStaticPrefix {
				proxyToDevFE(c, config.CONFIG_URL_APP_FRONT_END_STATIC_PREFIX)
				return
			} else {
				// all other request go to the front-end server
				proxyToDevFE(c, "")
			}
		}
		if isAppPreFix || isStaticPrefix {
			c.File(path.Join(global.GetFrontEndRootAppDir(), "index.html"))
		}
	})

	// cross-origin
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
		MaxAge: 12 * time.Hour,
	}))

	// User routes
	r_api := r.Group(config.CONFIG_URL_PUBLIC_BASE_PREFIX)

	// open APIs, mean no need to login to access
	openRoutes := r_api.Group(config.CONFIG_URL_OPENAPI_PREFIX)
	{
		// User routes
		userRoutes := openRoutes.Group("/user")
		{
			userRoutes.GET("/one/getByToken", visitGetByToken)
			userRoutes.GET("/all/getUserNameList", getUsernameAsResult)
			userRoutes.POST("/local/pw/calc", calcPassword)
			userRoutes.POST("/local/new", createNewAccount)
			userRoutes.POST("/local/verify", verifyUserServlet)
		}

		// Admin routes
		adminRoutes := openRoutes.Group("/admin")
		{
			adminRoutes.GET("/init/info", getAdminInitStatus)
			adminRoutes.POST("/init/create", createAdminInitStatus)
		}

		// Static routes
		nonPDir := global.GetResourceNonProhibitedDir()
		openRoutes.Static(("/res/public"), nonPDir)

		// Node RPC routes
		nodeRPCRoutes := openRoutes.Group("/node-rpc")
		{
			nodeRPCRoutes.GET("/getAllJobs", getAllNodeJobs)
		}

		// System routes
		systemRoutes := openRoutes.Group("/system")
		{
			systemRoutes.GET("/init/info", getInitInfoSystem)
		}

		// I18n routes
		i18nRoutes := openRoutes.Group("/i18n")
		{
			i18nRoutes.GET("/get", getI18NLang)
		}
	}

	userRoutes := r_api.Group("/user")
	{
		localRoutes := userRoutes.Group("/local")
		{
			localRoutes.POST("/pw/reset", resetPasswordByOldPassword)
			localRoutes.GET("/key/get", getAnyKeyByUserId)
			localRoutes.POST("/key/set", setAnyKeyByUserId)
		}
	}

	// System routes
	systemRoutes := r_api.Group("/system")
	{
		systemRoutes.GET("/stats", statsSystem)
		systemRoutes.GET("/getOneMotto", getMotto)
	}

	// Tool extension routes
	toolExtsRoutes := r_api.Group("/tool/exts")
	{
		toolExtsRoutes.GET("/listCategory", listCategory)
		toolExtsRoutes.GET("/listSubCategory", listSubCategory)
		toolExtsRoutes.GET("/getExtDetail", getOneExtUnderSpecificCategory)
		toolExtsRoutes.POST("/convertText", doActionForConvertingText)
	}

	// OS routes
	osRoutes := r_api.Group("/os")
	{
		osRoutes.POST("/temp/file/upload", uploadTempFile)
		osRoutes.GET("/temp/file/read", readTempFile)
		osRoutes.POST("/openDir", openDir)
		osRoutes.POST("/mkdirDir", mkdirDir)
		osRoutes.POST("/fileExist", checkIfFileExist)
	}

	// Workspace routes
	workspaceRoutes := r_api.Group("/workspace/users")
	{
		workspaceRoutes.GET("/one", workSpace_GetOneByUser)
		workspaceRoutes.GET("/list", workSpace_ListByUser)
		workspaceRoutes.POST("/add", workspace_AddByUser)
		workspaceRoutes.POST("/delete", workspace_DeleteByUser)
	}

	// WebSocket routes
	wsRoutes := r_api.Group("/ws")
	{
		wsRoutes.GET("/system", websocket_system)
		wsRoutes.GET("/post-job", websocket_postjob)
		if tools.IsDevMode {
			wsRoutes.GET("/dev-hmr", websocket_hmrreload)
		}
		// term, pty
		termRoutes := wsRoutes.Group("/pty")
		termRoutes.GET("/opt", websocket_opt_ws)
		termRoutes.GET("/term", websocket_term_ws)
	}

	// WebSocket routes
	syncRoutes := r_api.Group("/sync")
	{
		syncRoutes.POST("/reducer/save", saveSyncReducer)
		syncRoutes.GET("/reducer/get", getSyncReducer)
	}

	// WebSocket routes
	translationRoutes := r_api.Group("/translation")
	{
		translationRoutes.POST("/text/translate", translateText)
	}

}
