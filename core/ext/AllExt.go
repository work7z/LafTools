// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 13 Oct 2023
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

package ext

import (
	"encoding/json"
	"laftools-go/core/context"
	"laftools-go/core/form"
	"laftools-go/core/gutils"
	"laftools-go/core/log"
	"laftools-go/core/middleware"
	"laftools-go/core/nocycle"
	"path"
)

type SubExtCategory struct {
	CategoryId string
	Id         string
	Label      string
	Icon       string
	Children   []form.ExtensionVM
}

type TranslatePassArg = []string

type ToolChildrenSetByInit struct {
	Id    string
	Label TranslatePassArg
}

type ToolCategory struct {
	Id            string           `json:"id"`
	Label         TranslatePassArg `json:"label"`
	SubCategories []ToolSubCategory
}

type ToolSubCategory struct {
	Id                string
	Label             TranslatePassArg
	Icon              string
	ChildrenSetByInit []ToolChildrenSetByInit
}

func getPureJSFolder() string {
	return path.Join(gutils.GetResourceNonProhibitedDir(), "purejs")
}

func GetExtById(extId string) (*form.ExtensionVM, error) {
	var indexJSONFile = path.Join(getPureJSFolder(), "exts", extId, "index.json")
	returnValue := &form.ExtensionVM{}
	// read file and unmarhsla it to returnValue
	b, er := nocycle.ReadFileAsStrWithNoTrim(indexJSONFile)
	if er != nil {
		return nil, er
	}
	er = json.Unmarshal([]byte(b), returnValue)
	if er != nil {
		return nil, er
	}
	return returnValue, nil
}

func GetAllCategory() (*[]ToolCategory, error) {
	var categoryFile = path.Join(getPureJSFolder(), "category.json")
	var returnValue *[]ToolCategory = &[]ToolCategory{}
	// read file and unmarhsla it to returnValue
	b, er := nocycle.ReadFileAsStrWithNoTrim(categoryFile)
	if er != nil {
		return nil, er
	}
	er = json.Unmarshal([]byte(b), returnValue)
	if er != nil {
		return nil, er
	}
	return returnValue, nil
}

var Ref_AtomicInt int64 = 0

// write a function that return SubExtCategory array
func GetAllSubExtCategory(ctx *context.WebContext) (*[]ToolSubCategory, error) {
	allCategory, err := GetAllCategory()
	if err != nil {
		return nil, err
	}
	var arr []ToolSubCategory = []ToolSubCategory{}
	for _, category := range *allCategory {
		arr = append(arr, category.SubCategories...)
	}
	return &arr, nil
}

// return all form.ExtensionVM from functions whose begin with FN_
func GetAllExtVM(ctx *context.WebContext) []form.ExtensionVM {
	// collect all children items in GetAllSubExtCategory() and add them into the same array, then return
	allExtVM := make([]form.ExtensionVM, 0)
	b, _ := GetAllSubExtCategory(ctx)
	for _, subExtCategory := range *b {
		for _, extVM := range subExtCategory.ChildrenSetByInit {
			id := extVM.Id
			extVM, err := GetExtById(id)
			if err != nil {
				log.Ref().Warn("got err", err)
			} else {
				allExtVM = append(allExtVM, *extVM)
			}
		}
	}
	return allExtVM
}

func GetAllFuncMapIntoOneMapWithKeyValuePair(ctx *context.WebContext) map[string]*form.ValueHandler {
	allMaps := middleware.GetAllFNMap(ctx)
	return allMaps
}

func GetAllExtActionsWithKeyValuePair(ctx *context.WebContext) map[string]form.ExtensionAction {
	// get all Actions in GetAllExtVM, remember to recursive collect them
	allExtVM := GetAllExtVM(ctx)
	allExtActions := make(map[string]form.ExtensionAction)
	for _, extVM := range allExtVM {
		for _, action := range *extVM.Actions {
			allExtActions[action.Id] = action
		}
	}
	return allExtActions
}

func GetAllExtActions(ctx *context.WebContext) []form.ExtensionAction {
	// get all Actions in GetAllExtVM, remember to recursive collect them
	allExtVM := GetAllExtVM(ctx)
	allExtActions := make([]form.ExtensionAction, 0)
	for _, extVM := range allExtVM {
		allExtActions = append(allExtActions, *extVM.Actions...)
	}
	return allExtActions
}
