// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 20 Sep 2023
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

package cmd

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"laftools-go/core/api"
	"laftools-go/core/config"
	"laftools-go/core/env"
	"laftools-go/core/gutils"
	"laftools-go/core/log"
	"laftools-go/core/middleware"
	"laftools-go/core/nocycle"
	"laftools-go/core/url"
	"net"
	"net/http"
	"os"
	"path"
	"strconv"

	"github.com/fatih/color"
	"github.com/gin-gonic/gin"
	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "run",
	Short: "LafTools would be an epoch-striking software.",
	Long:  `More detail please visit https://codegen.cc`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Do nothing with root command")
	},
}

var runServerCmd = &cobra.Command{
	Use:   "server",
	Short: "run the server",
	Run: func(cmd *cobra.Command, args []string) {
		LaunchCodeGenServer()
		WaitForGenServerEnd()
	},
}

func WaitForGenServerEnd() {
	select {}
}

var runTestCmd = &cobra.Command{
	Use:   "test",
	Short: "run test",
	Run: func(cmd *cobra.Command, args []string) {

		// Create a new color object
		c := color.New(color.FgCyan).Add(color.Underline)
		c.Println("LafTools")

		// Or just add them to New()
		d := color.New(color.FgCyan, color.Bold)
		d.Printf("Do what you wanna do, %s\n", "it's cool!.")

	},
}

var middlewareCmd = &cobra.Command{
	Use:   "middleware",
	Short: "Do middleware stuff",
	Long:  `To call what CodeGen needs`,
	Run:   middleware.RunCMD,
}

func init() {

	cobra.OnInitialize(initConfig)

	// global root
	rootCmd.PersistentFlags().BoolVar(&nocycle.IsDevMode, "debug", true, "whether enable release mode or not")

	// init  run server
	runServerCmd.PersistentFlags().StringVar(&nocycle.RefId, "codegen.refid", "YVwYb.json", "ref for port && status && information")
	runServerCmd.PersistentFlags().StringVar(&nocycle.LafToolsGoRoot, "codegen.root", env.ENV_DefaultCodeGenRoot, "system root path")
	runServerCmd.PersistentFlags().StringVar(&nocycle.CodeGenAppConfigDir, "codegen.appconfigdir", env.ENV_defaultAppConfigDir, "config home path")

	// init middleware
	middleware.InitCMD(middlewareCmd)

	rootCmd.AddCommand(runServerCmd)
	rootCmd.AddCommand(middlewareCmd)
	rootCmd.AddCommand(runTestCmd)

}

func initConfig() {
	// do nothing
}

var R_Engine *gin.Engine

// var ServerQuit = make(chan os.Signal)

// lock for server
var Srv *http.Server

func LaunchCodeGenServer() {
	defer func() {
		if err := recover(); err != nil {
			SaveRefStatus(&RefStatus{
				Status:  99,
				Message: "Recovered from panic: " + nocycle.ToAnyString(err),
				Port:    0,
				FullURL: "",
				Host:    "",
			})
		}
	}()
	log.Ref().Info("Service is launching...")
	if nocycle.IsDevMode {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}
	R_Engine = gin.Default()
	api.ConfigSystemRouter(R_Engine)
	adminInitToken := config.GetAdminInitToken()
	if adminInitToken == "" {
		log.Ref().Fatal("Unable to read the admin init code, please check the file: " + config.GetAdminInitTokenFile())
		return
	}

	// set begin port
	beginPort := env.ENV_ProdPortStartFrom
	if nocycle.IsDevMode {
		beginPort = env.ENV_DevPortStartFrom
	}

	port, err2 := GetAvailableTCPPortFrom(beginPort)

	if port == env.ENV_DevPortStartFrom && !nocycle.IsDevMode {
		panic("Please do not use " + strconv.Itoa(env.ENV_DevPortStartFrom) + " to launch the service, try other port.")
	}

	nocycle.HTTP_PORT_ONCE_SET = port
	nocycle.ShouldNoErr(err2, "Unable to launch available port")

	host := "127.0.0.1:" + strconv.Itoa(port)

	fullURL := "http://" + host + "" + url.CONFIG_URL_APP_FRONT_END_APP_PREFIX + "/entry?t=" + adminInitToken

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
	if !nocycle.IsDevMode {
		gutils.OpenInBrowser(fullURL)
	}

	Srv = &http.Server{
		Addr:    host,
		Handler: R_Engine,
	}

	go func() {
		if err := Srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			nocycle.ShouldNoErr(err, "Unable to launch the service")
		}
	}()

}

type RefStatus struct {
	Status  int // 0 OK, 99 Unknown error
	Message string
	Port    int
	FullURL string
	Host    string
}

func GetRefDir() string {
	refDir := nocycle.MkdirFileWithStr(path.Join(nocycle.CodeGenAppConfigDir, "ref"))
	return refDir
}

func SaveRefStatus(refStatus *RefStatus) error {
	refDir := GetRefDir()
	refStatusBytes, err := json.Marshal(&refStatus)
	if err != nil {
		return err
	}
	log.Ref().Debug("Output Ref with ", string(refStatusBytes))
	err = ioutil.WriteFile(path.Join(refDir, ``+nocycle.RefId+``), refStatusBytes, 0644)
	if err != nil {
		return err
	}
	return nil
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func GetAvailableTCPPortFrom(startPort int) (int, error) {
	for port := startPort; port <= 65535; port++ {
		address := net.JoinHostPort("localhost", strconv.Itoa(port))
		listener, err := net.Listen("tcp", address)
		if err == nil {
			listener.Close()
			return port, nil
		}
	}
	return 0, fmt.Errorf("no available TCP port found")
}
