package pty

import (
	"encoding/json"
	"laftools-go/core/log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/websocket"
)

type windowSize struct {
	Rows uint16 `json:"rows"`
	Cols uint16 `json:"cols"`
	X    uint16
	Y    uint16
}
type OptWSRequest struct {
	Type string
	Uid  string
	Rows uint16
	Cols uint16
}
type ConcertoClz struct {
	Message   string `json:"message"`
	Port      string `json:"port"`
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
	Token     string `json:"token"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}
var concertoFilePath = os.Args[1]
var concerto ConcertoClz

func saveConcertoClz() {
	log.Ref().Info("Saving the concerto clz...")
	log.Ref().Info("time.Now().Unix()", time.Now().Unix())
	concerto.Timestamp = strconv.FormatInt(time.Now().Unix()*1000, 10)
	val, err := json.Marshal(concerto)
	log.Ref().Info("Marshal value: ", string(val))
	if err == nil {
		os.WriteFile(concertoFilePath, val, 0644)
	}
}

func handleTermWS(w http.ResponseWriter, r *http.Request) {
	log.Ref().Infof("remoteaddr, %s", r.RemoteAddr)
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Ref().Error("Unable to upgrade connection", err)
		return
	}

	log.Ref().Info("Interact with ", r.URL.RawQuery)
	// concerto.Token
	if !strings.Contains(r.URL.RawQuery, concerto.Token) {
		log.Ref().Error("Unable got the Token", err)

		return
	}

	internalHandleTermWS(w, r, conn)
}

// opt request
func handleOptWS(w http.ResponseWriter, r *http.Request) {
	log.Ref().Info("Received Opt Request: ", r.URL)
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Ref().Info("upgrade:", err)
		return
	}
	log.Ref().Info("Interact with ", r.URL.RawQuery)
	// concerto.Token
	if !strings.Contains(r.URL.RawQuery, concerto.Token) {
		log.Ref().Error("Unable got the Token", r.URL.RawQuery)
		return
	}
	defer c.Close()
	for {
		log.Ref().Info("looped here, receiving the Message...")
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Ref().Error("read:", err)
			break
		}
		log.Ref().Info("RECEIVED HERE: %s", string(message), mt)
		var inst_OptWSRequest OptWSRequest
		json.Unmarshal(message, &inst_OptWSRequest)
		log.Ref().Info("inst_OptWSRequest -> ", inst_OptWSRequest)
		if strings.Compare(inst_OptWSRequest.Type, "resize") == 0 {
			var token = r.URL.Query().Get("Token")
			internalHandleResize(inst_OptWSRequest, token)
		}

	}
	log.Ref().Info("Ending read the Message")
}

func ptyEntry() {
	// r.HandleFunc("/socket", handleTermWS)
	// r.HandleFunc("/opt", handleOptWS)
}
