// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Wed, 20 Dec 2023
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

package api

import (
	gt "github.com/bas24/googletranslatefree"
	"github.com/gin-gonic/gin"
)

type TextTranslationReqForm struct {
	SourceLang string
	TargetLang string
	Type       string
	Text       string
}

func API_Translate_Text(c *gin.Context) {
	form := TextTranslationReqForm{}
	e := c.BindJSON(&form)
	if e != nil {
		ErrLa(c, e)
	}

	OKLa(c, DoValueRes(1))
}

func translateText(text, sourceLang string, targetLang string) (string, error) {
	if targetLang == "en_US" {
		targetLang = "en"
	}
	if targetLang == "zh_CN" {
		targetLang = "zh-cn"
	}
	if targetLang == "zh_HK" {
		targetLang = "zh-hk"
	}
	return gt.Translate(text, sourceLang, targetLang)
}
