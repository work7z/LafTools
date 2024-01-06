// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Mon, 18 Dec 2023
// Author: LafTools Team - Ubuntu <work7z@outlook.com>
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
	"encoding/json"
	"laftools-go/core/global"
	"laftools-go/core/handlers/context"
	"laftools-go/core/tools"
	"path"

	"github.com/gin-gonic/gin"
)

type AppI18nRaw struct {
	Label          []string
	Value          string
	LabelInEnglish string
	LabelByLang    string
}

type AppI18nFormatted struct {
	AppI18nRaw
	Label          string
	LabelInEnglish string
	LabelByLang    string
	Value          string
}

func getI18NLang(c *gin.Context) {

	var indexJSONFile = path.Join(global.GetPureJSFolder(), "app-i18n.json")
	returnValue := []AppI18nRaw{}
	// read file and unmarhsla it to returnValue
	b, er := tools.ReadFileAsStrWithNoTrim(indexJSONFile)
	if er != nil {
		ErrLa(c, er)
		return
	}
	er = json.Unmarshal([]byte(b), &returnValue)
	if er != nil {
		ErrLa(c, er)
		return
	}
	formattedReturnValue := []AppI18nFormatted{}
	wc := context.NewWC(c)
	// format returnValue to formattedReturnValue
	for _, v := range returnValue {
		formattedReturnValue = append(formattedReturnValue, AppI18nFormatted{
			Label:          wc.Dot(v.Label[0], v.Label[1]),
			Value:          v.Value,
			LabelInEnglish: v.LabelInEnglish,
			LabelByLang:    v.LabelByLang,
		})
	}
	OKLa(c, DoValueRes(formattedReturnValue))
}
