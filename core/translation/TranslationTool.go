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

package translation

import (
	"laftools-go/core/gutils"
	"laftools-go/core/log"
	"laftools-go/core/nocycle"

	//"laftools-go/core/nocycle"
	"path"
	"strconv"
	"strings"

	"github.com/dablelv/cyan/conv"
)

const LANG_EN_US = "en_US"
const LANG_ZH_CN = "zh_CN"
const LANG_ZH_HK = "zh_HK"

type TraObject struct {
	lang string
}

func TraSystemOnly() *TraObject {
	return &TraObject{
		lang: "en_US",
	}
}

func TraFromWeb(lang string) *TraObject {
	return &TraObject{
		lang: lang,
	}
}

var tmp_keyMap map[string]map[string]string = map[string]map[string]string{}

// SKIP_DOT
func (t *TraObject) Dot(id string, enUS string, arg ...interface{}) string {
	lang := t.lang
	var newText = id
	var ack bool = false
	if lang == "" || lang == LANG_EN_US {
		newText = enUS
		ack = true
	} else if lang == LANG_ZH_CN || lang == LANG_ZH_HK {
		translationConfigObj := tmp_keyMap[lang]
		if translationConfigObj == nil || nocycle.IsDevMode {
			var err2 error = nil
			translationConfigObj, err2 = nocycle.ReadJSONFile(path.Join(gutils.GetLangDir(), lang+".json"))
			if err2 != nil {
				log.Ref().Fatal("No available text for the id " + id)
			} else {
				tmp_keyMap[lang] = translationConfigObj
			}
		}
		value, has := translationConfigObj[id]
		if has {
			pText := strings.ReplaceAll(value, "''", "'")
			if pText != "" {
				ack = true
				newText = pText
				ack = true
			}
		} else {
			log.Ref().Warning("No available text for the id " + id)
			newText = enUS
		}
	} else {
		log.Ref().Fatal("Unknown lang ", lang)
		return "invalid config"
	}

	if !ack {
		log.Ref().Warning("No available text for the id " + id)
	} else {
		for idx, idxVal := range arg {
			idxVal2, errParsing := conv.ToStringE(idxVal)
			if idxVal == nil || errParsing != nil {
				continue
			}
			replaceText := "{" + strconv.Itoa(idx) + "}"
			log.Ref().Debug("new text: "+newText, "len(arg)", len(arg))
			log.Ref().Debug("replace text: "+replaceText+", idxVal ", idxVal)
			newText = strings.ReplaceAll(newText, replaceText, idxVal2)
		}
		log.Ref().Debug("Dot: ", id+" -> ", newText)
	}
	return newText

}
