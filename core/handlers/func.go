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
	r.Use(AuthMiddleware)
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
		isAppPreFix := strings.Index(fullPath, config.CONFIG_URL_APP_FRONT_END_APP_PREFIX) == 0
		isStaticPrefix := strings.Index(fullPath, config.CONFIG_URL_APP_FRONT_END_STATIC_PREFIX) == 0
		// if current env is dev mode, then we just proxy the request to the front-end server.
		if tools.IsDevMode {
			if isAppPreFix {
				Proxy_To_FE(c, config.CONFIG_URL_APP_FRONT_END_APP_PREFIX)
				return
			} else if isStaticPrefix {
				Proxy_To_FE(c, config.CONFIG_URL_APP_FRONT_END_STATIC_PREFIX)
				return
			} else {
				// all other request go to the front-end server
				Proxy_To_FE(c, "")
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

	// TODO: if you have time, help to group sub routes like r_api.Group
	openRoutes := r_api.Group(config.CONFIG_URL_OPENAPI_PREFIX)
	{
		// User routes
		userRoutes := openRoutes.Group("/user")
		{
			userRoutes.GET("/one/getByToken", VisitGetByToken)
			userRoutes.GET("/all/getUserNameList", GetUsernameAsResult)
		}

		// Admin routes
		adminRoutes := openRoutes.Group("/admin")
		{
			adminRoutes.GET("/init/info", GetAdminInitStatus)
			adminRoutes.POST("/init/create", CreateAdminInitStatus)
		}

		// Static routes
		nonPDir := global.GetResourceNonProhibitedDir()
		openRoutes.Static(("/res/public"), nonPDir)

		// Node RPC routes
		nodeRPCRoutes := openRoutes.Group("/node-rpc")
		{
			nodeRPCRoutes.GET("/getAllJobs", Node_getAllJobs)
		}

		// System routes
		systemRoutes := openRoutes.Group("/system")
		{
			systemRoutes.GET("/init/info", GetInitInfoSystem)
		}

		// I18n routes
		i18nRoutes := openRoutes.Group("/i18n")
		{
			i18nRoutes.GET("/get", Get_i18n_Lang)
		}
	}

	userRoutes := r_api.Group("/user")
	{
		localRoutes := userRoutes.Group("/local")
		{
			localRoutes.POST("/pw/calc", CalcPassword)
			localRoutes.POST("/verify", VerifyUserServlet)
			localRoutes.POST("/new", CreateNewAccount)
			localRoutes.POST("/pw/reset", ResetPasswordByOldPassword)
			localRoutes.GET("/key/get", GetAnyKeyByUserId)
			localRoutes.POST("/key/set", SetAnyKeyByUserId)
		}
	}

	// System routes
	systemRoutes := r_api.Group("/system")
	{
		systemRoutes.GET("/stats", SYSTEM_Stats)
		systemRoutes.GET("/getOneMotto", GetMotto)
	}

	// Tool extension routes
	toolExtsRoutes := r_api.Group("/tool/exts")
	{
		toolExtsRoutes.GET("/listCategory", ListCategory)
		toolExtsRoutes.GET("/listSubCategory", ListSubCategory)
		toolExtsRoutes.GET("/getExtDetail", GetOneExtUnderSpecificCategory)
		toolExtsRoutes.POST("/convertText", DoActionForConvertingText)
	}

	// OS routes
	osRoutes := r_api.Group("/os")
	{
		osRoutes.POST("/temp/file/upload", TEMP_FILE_UPLOAD)
		osRoutes.GET("/temp/file/read", TEMP_FILE_READ)
		osRoutes.POST("/openDir", OS_OPENDIR)
		osRoutes.POST("/mkdirDir", File_Mkdir)
		osRoutes.POST("/fileExist", File_ExistOrNot)
	}

	// Workspace routes
	workspaceRoutes := r_api.Group("/workspace/users")
	{
		workspaceRoutes.GET("/one", WorkSpace_GetOne_By_User)
		workspaceRoutes.GET("/list", WorkSpace_List_By_User)
		workspaceRoutes.POST("/add", Workspace_Add_By_User)
		workspaceRoutes.POST("/delete", Workspace_Delete_By_User)
	}

	// WebSocket routes
	wsRoutes := r_api.Group("/ws")
	{
		wsRoutes.GET("/system", SYSTEM_WebSocket)
		wsRoutes.GET("/post-job", PostJob_WebSocket)
	}

}
