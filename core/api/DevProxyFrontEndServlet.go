package api

import (
	"io/ioutil"
	"laftools-go/core/log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

var url_feProxyPath = "http://localhost:5173/"

func API_Proxy_To_FE(c *gin.Context, prefix string) {
	allPath := c.Request.URL.Path
	// read the file in feAppDir and pipe its content into c
	subFilePath := strings.Replace(allPath, prefix, "", 1)
	fullPath := url_feProxyPath + subFilePath
	b, respH, e := getRemoteDataByGET(fullPath)
	if e != nil {
		c.Error(e)
	} else {
		// write b into c
		c.Data(http.StatusOK, respH, b)
	}
}

// a function created for sending GET request, and return byte[] as its return value
func getRemoteDataByGET(fullPath string) ([]byte, string, error) {
	// send a GET request for fullPath
	// and return its content as byte[]
	httpClient := &http.Client{
		Timeout: time.Second * 10,
	}
	req, err := http.NewRequest("GET", fullPath, nil)
	if err != nil {
		log.Ref().Error("Unable to create request for " + fullPath)
		return nil, "", err
	}
	resp, err := httpClient.Do(req)
	if err != nil {
		log.Ref().Error("Unable to send request for " + fullPath)
		return nil, "", err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Ref().Error("Unable to read response for " + fullPath)
		return nil, "", err
	}
	respType := resp.Header.Get("Content-Type")
	return body, respType, nil
}
