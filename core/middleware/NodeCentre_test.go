// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 7 Nov 2023
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

package middleware

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// func no_use_SendReqToNodeProcess(config NodeConfig, nodeReq *NodeReq) error {

// 	// check if nodeReq.Id ends with allLangMap, if not then return error
// 	isEndWithLang := false
// 	for _, lang := range allLangMap {
// 		if strings.HasSuffix(nodeReq.Id, lang) {
// 			isEndWithLang = true
// 			break
// 		}
// 	}
// 	if !isEndWithLang {
// 		return errors.New("the Id must ends with lang")
// 	}

// 	idx++
// 	checkNodeProcess(config)
// 	nodeReq.Lang = config.Lang
// 	fileNameRandom := randomFileName + strconv.Itoa(idx)
// 	// if Id is empty, then throw error
// 	if nodeReq.Id == "" {
// 		return errors.New("the Id is empty")
// 	}
// 	filename := fileNameRandom + ".job"
// 	log.Ref().Debug("Sending the file for " + config.Lang + " -> " + filename)
// 	Ref_NodeReqSet.writeMap(nodeReq.Id, "1")

// 	LockForChannelNode.Lock()
// 	Ref_nodeResCacheMap[nodeReq.Id] = make(chan NodeRes, 1)
// 	LockForChannelNode.Unlock()

// 	reqFile := path.Join(getConsumerDir(), filename)
// 	nodeReqB, err := json.Marshal(nodeReq)
// 	if err != nil {
// 		return err
// 	}
// 	err2 := nocycle.WriteStrIntoFile(reqFile, string(nodeReqB))
// 	if err2 != nil {
// 		return err2
// 	}
// 	increaseFile := getIncreaseLck()
// 	log.Ref().Info("increaseFile", increaseFile)
// 	// write current timestamp
// 	err3 := nocycle.WriteStrIntoFile(increaseFile, filename)
// 	if err3 != nil {
// 		return err3
// 	}
// 	return nil
// }

// test NodeReq.getUID == NodeRes.getUID
func TestNodeReq(t *testing.T) {
	a := NodeReq{
		Id:   "ok",
		Lang: "zh_CN",
	}
	b := NodeRes{
		Id:   "ok",
		Lang: "zh_CN",
	}
	assert.Equal(t, a.GetUID(), b.GetUID())
}
