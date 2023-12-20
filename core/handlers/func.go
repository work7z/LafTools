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
	doGET_ := func(relativePath string, handlers gin.HandlerFunc) gin.IRoutes {
		return r.GET(config.FormatThatPathGlobally(relativePath), handlers)
	}
	doPOST := func(relativePath string, handlers gin.HandlerFunc) gin.IRoutes {
		return r.POST(config.FormatThatPathGlobally(relativePath), handlers)
	}
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

	_visitor_can_ := func(path string) string {
		config.CONFIG_URL_VISIT_URLS = append(config.CONFIG_URL_VISIT_URLS, path)
		return path
	}
	/**
	About the routes:
		- _visitor_can_ means the API can be accessible without token
		- _admin_only_ means the API can only be accessible to for admin only
		- Other APIs without any prefix means the API can be accessible only to users and be prohibited to unauthorized visitors.
	*/
	// user
	doGET_(_visitor_can_("/user/one/getByToken"), VisitGetByToken)
	doGET_(_visitor_can_("/user/all/getUserNameList"), GetUsernameAsResult)
	doGET_(_visitor_can_("/admin/init/info"), GetAdminInitStatus)
	doPOST(_visitor_can_("/admin/init/create"), CreateAdminInitStatus)
	doGET_(_visitor_can_("/system/init/info"), GetInitInfoSystem)
	doGET_(_visitor_can_("/node-rpc/getAllJobs"), Node_getAllJobs)
	doPOST(_visitor_can_("/user/local/pw/calc"), CalcPassword)
	doPOST(_visitor_can_("/user/local/verify"), VerifyUserServlet)
	doGET_(_visitor_can_("/i18n/get"), Get_i18n_Lang)
	doPOST("/user/local/new", CreateNewAccount)
	doPOST("/user/local/pw/reset", ResetPasswordByOldPassword)
	doGET_("/user/local/key/get", GetAnyKeyByUserId)
	doPOST("/user/local/key/set", SetAnyKeyByUserId)

	// extension
	doGET_("/tool/exts/listCategory", ListCategory)
	doGET_("/tool/exts/listSubCategory", ListSubCategory)
	doGET_("/tool/exts/getExtDetail", GetOneExtUnderSpecificCategory)
	doPOST("/tool/exts/convertText", DoActionForConvertingText)

	// os
	doPOST("/os/temp/file/upload", TEMP_FILE_UPLOAD)
	doGET_("/os/temp/file/read", TEMP_FILE_READ)
	doPOST("/os/openDir", OS_OPENDIR)
	doPOST("/os/mkdirDir", File_Mkdir)
	doPOST("/os/fileExist", File_ExistOrNot)

	// workspace
	doGET_("/workspace/users/one", WorkSpace_GetOne_By_User)
	doGET_("/workspace/users/list", WorkSpace_List_By_User)
	doPOST("/workspace/users/add", Workspace_Add_By_User)
	doPOST("/workspace/users/delete", Workspace_Delete_By_User)

	// ws(websocket, note that ws has particular auth logic in servlet)
	doGET_("/ws/system", SYSTEM_WebSocket)
	doGET_("/ws/post-job", PostJob_WebSocket)
	if tools.IsDevMode {
		doGET_("/ws/dev-hmr", HmrReload)
	}

	// system
	doGET_("/system/stats", SYSTEM_Stats)
	doGET_("/system/getOneMotto", GetMotto)

	// sync
	doGET_("/sync/reducer/get", Sync_Reducer_Get)
	doPOST("/sync/reducer/save", Sync_Reducer_Save)

	// translation
	doPOST("/translation/text", Translate_Text)

	// static folders
	nonPDir := global.GetResourceNonProhibitedDir()
	r.Static(config.FormatThatPathGlobally(_visitor_can_("/res/public")), nonPDir)

}
