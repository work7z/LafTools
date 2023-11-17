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
	"codegen-go/core/context"
	"codegen-go/core/form"
	"codegen-go/core/log"
	"codegen-go/core/middleware"
	"strconv"
	"sync/atomic"
)

type SubExtCategory struct {
	CategoryId string
	Id         string
	Label      string
	Icon       string
	Children   []form.ExtensionVM
}

type CategoryDefinition struct {
	Id    string `json:"id"`
	Label string `json:"label"`
}

type ListExtForTheCategoryRes struct {
	CategoryId     string
	Id             string
	Label          string
	Icon           string
	ChildrenAsInfo []form.ExtensionInfo
}

func GetAllCategory(ctx *context.WebContext) (*[]CategoryDefinition, error) {
	var returnValue *[]CategoryDefinition = &[]CategoryDefinition{}
	crtLang := ctx.GetUserLanguage()
	a, er := middleware.BIO_SendReqToNodeProcess(&middleware.NodeReq{
		Id:   "listCategory" + GetAtomicInt(),
		Lang: crtLang,
		Type: "Job_ListCategory",
	}, true, returnValue)
	if er != nil {
		return nil, er
	}
	return a.OutputValue.(*[]CategoryDefinition), nil
}

var Ref_AtomicInt int64 = 0

func GetAtomicInt() string {
	return strconv.FormatInt(atomic.AddInt64(&Ref_AtomicInt, 1), 10)
}

// write a function that return SubExtCategory array
func GetAllSubExtCategory(ctx *context.WebContext) (*[]SubExtCategory, error) {
	var returnValue *[]SubExtCategory = &[]SubExtCategory{}
	crtLang := ctx.GetUserLanguage()
	id := "listSubCategory-" + GetAtomicInt()
	a, er := middleware.BIO_SendReqToNodeProcess(&middleware.NodeReq{
		Id:   id,
		Lang: crtLang,
		Type: "Job_ListSubCategoryAndFunctions",
	}, true, returnValue)
	if er != nil {
		return nil, er
	}
	log.Ref().Debug("got GetAllSubExtCategory, ", a, " and id ->", id)
	// return a as *[]SubExtCategory by force cast
	return a.OutputValue.(*[]SubExtCategory), nil
}

// return all form.ExtensionVM from functions whose begin with FN_
func GetAllExtVM(ctx *context.WebContext) []form.ExtensionVM {
	// collect all children items in GetAllSubExtCategory() and add them into the same array, then return
	allExtVM := make([]form.ExtensionVM, 0)
	b, _ := GetAllSubExtCategory(ctx)
	for _, subExtCategory := range *b {
		for _, extVM := range subExtCategory.Children {
			allExtVM = append(allExtVM, extVM)
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
