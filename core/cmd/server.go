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

	host := "127.0.0.1:" + strconv.Itoa(port)

	fullURL := "http://" + host + "" + config.CONFIG_URL_APP_FRONT_END_APP_PREFIX + "/entry?t=" + adminInitToken

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
