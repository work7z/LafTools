// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Tue, 19 Sep 2023
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

package menu

import (
	"codegen-go/core/gutils"
	"codegen-go/core/log"
	"encoding/json"
	"io/ioutil"
	"path/filepath"
)

type Menu struct {
	Root     bool   `json:"root"`
	Label    string `json:"label"`
	Icon     string `json:"icon"`
	Id       string `json:"id"`
	Children []Menu `json:"children"`
}

var previousMenu *Menu = nil

func GetMenuArr() (*Menu, error) {
	if previousMenu != nil {
		return previousMenu, nil
	}
	menuJSONStrB, err := ioutil.ReadFile(filepath.Join(gutils.GetResourceNonProhibitedDir(), "menu.json"))
	if err != nil {
		return nil, err
	} else {
		var item Menu
		err = json.Unmarshal(menuJSONStrB, &item)
		if err != nil {
			return nil, err
		}
		log.Ref().Info("Menu: ", item)
		previousMenu = &item
		return &item, nil
	}
}
