// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 21 Dec 2023
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

package cmd

import (
	"encoding/json"
	"io/ioutil"
	gconfig "laftools-go/core/config"
	"laftools-go/core/global"
	handlers "laftools-go/core/handlers"
	"laftools-go/core/handlers/config"
	"laftools-go/core/log"
	"laftools-go/core/project/base/env"
	"laftools-go/core/tools"
	"net/http"
	"path"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/spf13/cobra"
)

var runServerCmd = &cobra.Command{
	Use:   "server",
	Short: "run the server",
	Run: func(cmd *cobra.Command, args []string) {
		LaunchLafToolsServer()
		select {}
	},
}

func LaunchLafToolsServer() {
	defer func() {
		if err := recover(); err != nil {
			SaveRefStatus(&RefStatus{
				Status:  99,
				Message: "Recovered from panic: " + tools.ToAnyString(err),
				Port:    0,
				FullURL: "",
				Host:    "",
			})
		}
	}()
	log.Ref().Info("Service is launching...")
	if tools.IsDevMode {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}
	R_Engine = gin.Default()

	handlers.SetupRoutes(R_Engine)

	adminInitToken := gconfig.GetAdminInitToken()
	if adminInitToken == "" {
		log.Ref().Fatal("Unable to read the admin init code, please check the file: " + gconfig.GetAdminInitTokenFile())
		return
	}

	// set begin port
	beginPort := 0
	if tools.IsDevMode {
		beginPort = env.DevPortStartFrom
	} else {
		beginPort = env.ProdPortStartFrom
	}

	// if this port is unavailable, then use higher one
	port, err2 := tools.GetAvailableTCPPortFrom(beginPort)

	if port == env.DevPortStartFrom && !tools.IsDevMode {
		panic("Please do not use " + strconv.Itoa(env.DevPortStartFrom) + " to launch the service, try other port.")
	}

	tools.FINALIZED_HTTP_PORT = port
	tools.ShouldNoErr(err2, "Unable to launch available port")

	var host string = ""
	if tools.IsDockerMode() {
		host = "0.0.0.0:" + strconv.Itoa(port)
	} else {
		host = "127.0.0.1:" + strconv.Itoa(port)
	}

	actualServerPath := "127.0.0.1"
	if tools.IsDockerMode() {
		actualServerPath = "127.0.0.1" // TODO: consider to use other domain
	}
	fullURL := "http://" + strings.ReplaceAll(host, "0.0.0.0", actualServerPath) + "" + config.CONFIG_URL_APP_FRONT_END_APP_PREFIX + "/entry?t=" + adminInitToken

	if tools.IsOnlineMode() {
		// align with visit.go
		// set password directly
		userConfig := gconfig.UserConfig{
			Id:             global.UUID(),
			Username:       "root", // default value
			Password:       gconfig.EncryptUserPassword("1234"),
			Token:          global.UUID(),
			CreateTime:     time.Now(),
			IsAdmin:        true,
			InvitationCode: global.UUID(),
		}
		userConfigMap, e2 := gconfig.GetUserConfigFromFile()
		if e2 != nil {
			tools.ShouldNoErr(e2, "get user config from file")
			return
		}
		userConfigMap[userConfig.Id] = userConfig
		err := gconfig.SetUserConfigIntoFile(userConfigMap)
		if err != nil {
			tools.ShouldNoErr(err, "set user config into file")
		}
		// update system info
		systemInfo := gconfig.GetCurrentSystemInfo()
		systemInfo.HasAdminInit = true
		gconfig.SaveCurrentSystemInfo(systemInfo)
	}

	SaveRefStatus(&RefStatus{
		Status:  0,
		Message: "OK",
		Port:    port,
		FullURL: fullURL,
		Host:    host,
	})

	println("")
	println("-----------------------------------------------")
	println("PLEASE ACCESS THE LINK BELOW IN BROWSER.")
	println("请复制下方链接并在浏览器端打开(for zh_CN users)")
	println("請復製下方鏈接並在瀏覽器端打開(for zh_HK users)")
	println("" + fullURL + "  ")
	println("-----------------------------------------------")
	println("")

	if !tools.IsDevMode {
		global.OpenInBrowser(fullURL)
	}

	Srv = &http.Server{
		Addr:    host,
		Handler: R_Engine,
	}

	go func() {
		if err := Srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			tools.ShouldNoErr(err, "Unable to launch the service")
		}
	}()
}

var R_Engine *gin.Engine

// lock for server
var Srv *http.Server

type RefStatus struct {
	Status  int // 0 OK, 99 Unknown error
	Message string
	Port    int
	FullURL string
	Host    string
}

func GetRefDir() string {
	refDir := tools.MkdirFileWithStr(path.Join(tools.LafToolsHomeConfigDir, "ref"))
	return refDir
}

func SaveRefStatus(refStatus *RefStatus) error {
	refDir := GetRefDir()
	refStatusBytes, err := json.Marshal(&refStatus)
	if err != nil {
		return err
	}
	log.Ref().Debug("Output Ref with ", string(refStatusBytes))
	err = ioutil.WriteFile(path.Join(refDir, ``+tools.RefId+``), refStatusBytes, 0644)
	if err != nil {
		return err
	}
	return nil
}
