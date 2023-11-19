// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 8 Nov 2023
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
	"laftools-go/core/config"
	"laftools-go/core/context"
	"laftools-go/core/ext"
	"laftools-go/core/gutils"
	"laftools-go/core/log"
	"laftools-go/core/middleware"
	"laftools-go/core/nocycle"
	"math/rand"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestGetAllSubExtCategory(t *testing.T) {
	QTestServerEnvLaunch(t)

	defer QUnlockServer(t)
	// for 1..3
	// define an array with three element capablity
	var arr [3]string
	arr[0] = "zh_CN"
	arr[1] = "zh_HK"
	arr[2] = "en_US"
	// for arr
	for i := 0; i < 3; i++ {
		startTime := time.Now()
		b, _ := ext.GetAllSubExtCategory(&context.WebContext{
			OverwriteUserLang: "zh_HK",
		})
		a, e := ext.GetAllSubExtCategory(&context.WebContext{
			OverwriteUserLang: "zh_CN",
		})
		c, _ := ext.GetAllSubExtCategory(&context.WebContext{
			OverwriteUserLang: "en_US",
		})
		if e != nil {
			t.Error(e)
			return
		}
		zh_CNStr, _ := gutils.ToJSONStr(a)
		b2, _ := gutils.ToJSONStr(b)
		c2, _ := gutils.ToJSONStr(c)
		// check b contains "編碼和解碼"
		assert.Contains(t, b2, "編碼和解碼")
		// check a contains "编码与解码"
		assert.Contains(t, zh_CNStr, "编码和解码")
		// check c contains "Click here to"
		assert.Contains(t, c2, "Click here to")

		// assert a2!= b2!=c2
		assert.NotEqual(t, zh_CNStr, b2)
		assert.NotEqual(t, b2, c2)
		assert.NotEqual(t, zh_CNStr, c2)
		endTime := time.Now()
		t.Log("time cost:", endTime.Sub(startTime))
		// t.Log("result" + a2)
	}
}

func TestGetAllCategory(t *testing.T) {
	QTestServerEnvLaunch(t)

	defer QUnlockServer(t)
	a, e := ext.GetAllSubExtCategory(&context.WebContext{
		OverwriteUserLang: "zh_CN",
	})
	if e != nil {
		t.Error(e)
		return
	}
	a2, _ := gutils.ToJSONStr(a)
	t.Log("result" + a2)
}

// provide a link to test the server
// provide a sig locker
var lock_Service = &sync.Mutex{}

func QTestServerEnvLaunch(t *testing.T) func() {
	lock_Service.Lock()
	t.Parallel()
	nocycle.UNIT_TEST_SERVER_MODE = true
	LaunchCodeGenServer()
	time.Sleep(time.Second * 3)
	return func() {
	}
}
func QUnlockServer(t *testing.T) {
	// Create a context with a timeout
	Srv.Shutdown(nil)
	lock_Service.Unlock()
}

// write test cases to verify the returns of GetAllExtVM, make sure the Actions in each item has uniq id, at the same time, Info.Id should also be uniq
func Test_GetAllExtVM(t *testing.T) {
	QTestServerEnvLaunch(t)

	defer QUnlockServer(t)
	ctx := context.WebContext{}
	allExtVM := ext.GetAllExtVM(&ctx)
	// check the uniq of Actions.Id
	actionsIdMap := make(map[string]bool)
	for _, extVM := range allExtVM {
		for _, action := range *extVM.Actions {
			if _, ok := actionsIdMap[action.Id]; ok {
				t.Errorf("the action id %s is not uniq", action.Id)
			} else {
				actionsIdMap[action.Id] = true
			}
		}
	}
	// check the uniq of Info.Id
	infoIdMap := make(map[string]bool)
	for _, extVM := range allExtVM {
		if _, ok := infoIdMap[extVM.Info.Id]; ok {
			t.Errorf("the info id %s is not uniq", extVM.Info.Id)
		} else {
			infoIdMap[extVM.Info.Id] = true
		}
	}
	// check the field Actions.CallFuncList, the first part of their value(split by ".") should be in the FuncMap
	for _, extVM := range allExtVM {
		for _, action := range *extVM.Actions {
			for _, callFunc := range action.CallFuncList {
				// get first part of callFunc
				callFunc = callFunc[:strings.Index(callFunc, ".")]
				if _, ok := (middleware.GetAllFNMap(&ctx))[callFunc]; !ok {
					t.Errorf("the call func %s is not in the func map", callFunc)
				}
			}
		}
	}
	// check the field Actions.CallFuncList, the second part of its value which is joinned by "." should be "ConvertText" or "ConvertFile"
	for _, extVM := range allExtVM {
		for _, action := range *extVM.Actions {
			for _, callFunc := range action.CallFuncList {
				// get second part of callFunc
				callFunc = callFunc[strings.Index(callFunc, ".")+1:]
				if callFunc != "ConvertText" && callFunc != "ConvertFile" {
					t.Errorf("the call func %s is not ConvertText or ConvertFile", callFunc)
				}
			}
		}
	}
	// check FuncMap in allExtVM has only unique id
	funcMapIdMap := make(map[string]bool)
	for funcName, funcValue := range middleware.GetAllFNMap(&ctx) {
		if _, ok := funcMapIdMap[funcName]; ok {
			t.Errorf("the func map id %s is not uniq", funcName)
		} else {
			funcMapIdMap[funcName] = true
		}
		// check the funcValue
		if funcValue == nil {
			t.Errorf("the func map value of %s is nil", funcName)
		}
	}
}

type TmpLabel struct {
	Lang string
	Desc string
}

func TestSendReqToNodeProcess(t *testing.T) {
	QTestServerEnvLaunch(t)

	defer QUnlockServer(t)

	// set a array for zh_CN, zh_HK, en_US and their result text
	arr := []TmpLabel{
		{
			Lang: "zh_CN",
			Desc: "这是您好，世界",
		},
		{
			Lang: "zh_HK",
			Desc: "這是您好，世界",
		},
		{
			Lang: "en_US",
			Desc: "this is hello, world",
		},
	}
	for _, tl := range arr {
		reqId := "hello-world-id" + tl.Lang
		tType := "helloWorld"
		err := middleware.SendNodeReq(&middleware.NodeReq{
			Lang: tl.Lang,
			Id:   reqId,
			Type: tType,
		})
		if err != nil {
			t.Error(err)
		}
		// waitng for response of Ref_nodeResCacheMap[jobId]
		t.Log("waiting for the selection")

		// cha, _ := middleware.Ref_NodeResSet.ReadMap(reqId)
		// res := <-cha

		// close(cha)
		// middleware.Ref_NodeResSet.DeleteMap(reqId)

		// select {
		// case res := <-middleware.Ref_Chan_NodeRes:
		// 	t.Log("got res from chan", res)
		// 	t.Log("selection is ok now")
		// 	t.Log("crt-lang", tl.Lang)
		// 	t.Log("res", res)
		// 	assert.Equal(t, reqId, res.Id)
		// 	assert.Equal(t, tType, res.Type)
		// 	assert.Equal(t, tl.Desc, res.OutputValue)
		// }
	}

}

func TestSimpleRunNode(t *testing.T) {
	// average need 90ms, so my current solution still win the time
	for i := 0; i < 10; i++ {
		startTime := time.Now()
		cmd := exec.Command("node", (nocycle.CodeGenGoRoot + "/sub/node/build/direct-run-job.js"))
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		if err := cmd.Run(); err != nil {
			t.Error(err)
		}
		endTime := time.Now()
		t.Log("time cost:", endTime.Sub(startTime))

	}
}

func GetRandomLang() string {
	// random get lang from zh_CN,zh_HK,en_US
	arr := []string{
		"zh_CN",
		"zh_HK",
		"en_US",
	}
	return arr[GetRandomInt(0, 2)]
}
func GetRandomInt(min, max int) int {
	return min + rand.Intn(max-min)
}

func TestNodeMultipleRequest(t *testing.T) {
	middleware.DEV_EXIT_SECONDS = "1"
	BasicTestNodeMultipleRequest(t)
}
func TestNodeMultipleRequest2(t *testing.T) {
	middleware.DEV_EXIT_SECONDS = "5"
	BasicTestNodeMultipleRequest(t)
}
func TestNodeMultipleRequest3(t *testing.T) {
	middleware.DEV_EXIT_SECONDS = "10"
	BasicTestNodeMultipleRequest(t)
}

func BasicTestNodeMultipleRequest(t *testing.T) {
	QTestServerEnvLaunch(t)

	defer QUnlockServer(t)

	nocycle.IsDebugMode = true

	// call GetAllSubExtCategory until endTime - startTime > 20seconds.
	// and check the result
	startTime := time.Now()

	maxTimeDiff := 0
	totalTriggerTimes := 0
	maxTimeDiffStr := ""
	// provide vars for averages count
	// provide a variable to store all times
	var allTimes = []int64{}

	// for 1 to 3
	for i := 0; i < 3; i++ {
		go func() {
			for {
				//
				totalTriggerTimes++
				crt_start := time.Now()
				// call two GetAllSubExtCategory by go routine
				_, e := ext.GetAllSubExtCategory(&context.WebContext{
					OverwriteUserLang: GetRandomLang(),
				})
				if e != nil {
					t.Error(e)
					return
				}

				endTime := time.Now()
				if endTime.Sub(startTime) > time.Second*20 {
					break
				}
				// if endTime - crtReqTime >= 2 seconds, then show it error
				// if endTime.Sub(crtReqTime) >= time.Second*3 {
				// 	// if endTime.Sub(crtReqTime) < time.Second*1 {
				// 	t.Error("the request time is too long, it is ", endTime.Sub(crtReqTime))
				// 	// directly exit this error
				// 	os.Exit(99)
				// }
				// record max record per request
				allTimes = append(allTimes, endTime.Sub(crt_start).Milliseconds())
				if endTime.Sub(crt_start) > time.Duration(maxTimeDiff)*time.Millisecond {
					maxTimeDiff = int(endTime.Sub(crt_start) / time.Millisecond)
					maxTimeDiffStr = "" + strconv.Itoa(int(endTime.Sub(crt_start).Milliseconds())) + "ms"
				}
			}
		}()
	}
	// wait for 20 seconds
	// in 20 seconds
	time.Sleep(time.Second * 20)
	// show macTimeDiff
	// average in allTimes
	// show totalTriggerTimes
	t.Log("** average time per request: ", GetAverage(allTimes))
	t.Log("** totalTriggerTimes: ", totalTriggerTimes)
	t.Log("** maxTimePerRequest: ", maxTimeDiffStr)
	t.Log("** wakeup times: ", middleware.DEV_WAKUP_TIMES)
	t.Log("** DEV_EXIT_SECONDS: ", middleware.DEV_EXIT_SECONDS)

}

func GetAverage(arr []int64) string {
	var total int64 = 0
	for _, v := range arr {
		total += v
	}
	return strconv.FormatInt(total/int64(len(arr)), 10) + "ms"
}

func TestSimplePutAndGet(t *testing.T) {

	QTestServerEnvLaunch(t)

	defer QUnlockServer(t)

	// from 1.100
	for i := 0; i < 10; i++ {
		// set startTime
		startTime := time.Now()

		t.Log("sending it to node")
		theId := "m12049" + strconv.Itoa(i)
		req := &middleware.NodeReq{
			Lang:       "zh_CN",
			InputValue: "this is input value",
			Id:         theId,
			Type:       "randomCall",
		}
		err := middleware.SendNodeReq(req)
		if err != nil {
			t.Error(err)
		}
		nodeRes, err2 := middleware.ReceiveNodeReq((*req).GetUID())
		if err2 != nil {
			t.Error(err2)
		}
		t.Log("node res:", *nodeRes)

		// get end time
		endTime := time.Now()
		t.Log("time cost:", endTime.Sub(startTime))

		if len(middleware.Ref_WaitResMap) != 0 {
			t.Error("not cleanup for wait kv map, during the loop")
		}

	}
	t.Log("Ref_WaitResMap ctn is ", len(middleware.Ref_WaitResMap))
	if len(middleware.Ref_WaitResMap) != 0 {
		t.Error("not cleanup for wait kv map")
	}
}

func TestSendReqToNodeProcessForPerformance(t *testing.T) {
	QTestServerEnvLaunch(t)

	defer QUnlockServer(t)
	totalCtn := 0
	// set a array for zh_CN, zh_HK, en_US and their result text
	arr := []TmpLabel{
		{
			Lang: "zh_CN",
			Desc: "这是您好，世界",
		},
		{
			Lang: "zh_HK",
			Desc: "這是您好，世界",
		},
		{
			Lang: "en_US",
			Desc: "this is hello, world",
		},
	}
	for _, tl := range arr {
		// from 1.100
		for i := 0; i < 1000; i++ {
			totalCtn++
			reqId := "randomCall-id" + strconv.Itoa(i) + tl.Lang
			tType := "randomCall"
			err := middleware.SendNodeReq(&middleware.NodeReq{
				Lang:       tl.Lang,
				InputValue: reqId + "OK",
				Id:         reqId,
				Type:       tType,
			})
			if err != nil {
				t.Error(err)
			}
			// waitng for response of Ref_nodeResCacheMap[jobId]
			t.Log("waiting for the selection")

			// select {
			// case res := <-middleware.Ref_Chan_NodeRes:
			// 	t.Log("got res from chan", res)
			// 	t.Log("selection is ok now")
			// 	t.Log("crt-lang", tl.Lang)
			// 	t.Log("res", res)
			// 	assert.Equal(t, reqId, res.Id)
			// 	assert.Equal(t, tType, res.Type)
			// 	assert.Equal(t, reqId+"OKack", res.OutputValue)
			// }
		}
	}
	t.Log("totalCtn: ", totalCtn)

}

func TestOther(t *testing.T) {
	// show example for channel
	ch := make(chan int, 1)
	go func() {
		time.Sleep(time.Second * 5)
		ch <- 10086
		ch <- 10010
	}()
	t.Log("waiting for send the value")

	t.Log("ch", <-ch)
	t.Log("not work", <-ch)
}

func TestLocalWebLogic(t *testing.T) {
	QTestServerEnvLaunch(t)

	defer QUnlockServer(t)
	// send GET request to get  http://localhost:35000/app/entry?t=0140c33c6dca11eea206186590df157b
	// and check the response
	adminInitToken := config.GetAdminInitToken()
	resp, err := http.Get("http://localhost:35000/app/entry?t=" + adminInitToken)
	if err != nil {
		t.Error(err)
	}
	t.Log("resp", resp)
	log.Ref().Debug("Checking the request for websocket")
}

func TestNodeConnnecntivy(t *testing.T) {
	QTestServerEnvLaunch(t)

	defer QUnlockServer(t)
	// send GET request to get  http://localhost:35000/app/entry?t=0140c33c6dca11eea206186590df157b
	// and check the response
	adminInitToken := config.GetAdminInitToken()
	resp, err := http.Get("http://localhost:35000/app/entry?t=" + adminInitToken)
	if err != nil {
		t.Error(err)
	}
	t.Log("resp", resp)
	log.Ref().Debug("Checking the request for websocket")
	// send node request
	middleware.SendNodeReq(&middleware.NodeReq{
		Lang: "zh_CN",
		Id:   "hello-world-id",
		Type: "helloWorld",
	})
}
