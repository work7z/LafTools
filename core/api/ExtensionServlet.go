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

package api

import (
	"errors"
	"laftools-go/core/context"
	"laftools-go/core/ext"
	"laftools-go/core/form"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

// write a function GetExtDetail for retrieving the detail of an extension by extId query
type DocallActionFuncListForm struct {
	ActionId  string
	InputText string
}

func DoActionForConvertingText(c *gin.Context) {
	crt_form := &DocallActionFuncListForm{}
	c.BindJSON(&crt_form)
	wc := context.NewWC(c)
	actionId := crt_form.ActionId
	actionItem, err := extraConvertAction(wc, actionId)
	if err != nil {
		ErrLa(c, err)
		return
	} else {
		funcMap := ext.GetAllFuncMapIntoOneMapWithKeyValuePair(&wc)
		ipt := crt_form.InputText
		crtFuncList := actionItem.CallFuncList
		// iterate crtFuncList, and split each item by ".", and call funcMap[item].ConvertText(form.ValueReq{})
		for _, item := range crtFuncList {
			// split by "."
			splitted := strings.Split(item, ".")
			// call funcMap[item].ConvertText(form.ValueReq{})
			crtValueRes := funcMap[splitted[0]].ConvertText(form.ValueReq{
				InputText: ipt,
			})
			if crtValueRes.Err != nil {
				ErrLa(c, crtValueRes.Err)
				return
			}
			ipt = crtValueRes.OutputText
		}
		OKLa(c, DoValueRes(gin.H{
			"OutputText": ipt,
		}))
	}
}

func extraConvertAction(wc context.WebContext, actionId string) (*form.ExtensionAction, error) {
	allExtActionsMap := ext.GetAllExtActionsWithKeyValuePair(&wc)
	// find item in allExtActions
	item, found := allExtActionsMap[actionId]
	if !found {
		return nil, errors.New(wc.Dot("KqTYC", "Action Not Found"))
	} else {
		return &item, nil
	}
}

// write a function GetOneExtUnderSpecificCategory for retrieving the detail of an extension by extId query
func GetOneExtUnderSpecificCategory(c *gin.Context) {
	extId := c.Query("extId")
	wc := context.WebContext{GinContext: c}
	if extId == "" {
		ErrLa2(c, wc.Dot("eIXF4", "Extension ID is required"))
		return
	}
	allExtVM := ext.GetAllExtVM(&wc)
	// find item in allExtVM by extId
	item, found := lo.Find(allExtVM, func(item form.ExtensionVM) bool {
		return item.Info.Id == extId
	})
	if !found {
		ErrLa2(c, wc.Dot("Sao_s", "Extension Not Found"))
		return
	} else {
		OKLa(c, DoValueRes(item))
	}
}

func ListSubCategory(c *gin.Context) {
	categoryId := c.Query("categoryId")
	wc := context.WebContext{GinContext: c}
	if categoryId == "" {
		ErrLa2(c, wc.Dot("1322", "Category ID is required"))
		return
	}
	subExtCategory, err := ext.GetAllSubExtCategory(&wc)
	if err != nil {
		ErrLa(c, err)
		return
	}
	isAll := categoryId == "all"
	filteredArr := make([]ext.ListExtForTheCategoryRes, 0)
	for _, item := range *subExtCategory {
		if isAll || item.CategoryId == categoryId {
			// collect item.Children.Info as an array, and assign it to Info
			c := make([]form.ExtensionInfo, 0)
			for _, child := range item.Children {
				c = append(c, *child.Info)
			}
			filteredArr = append(filteredArr, ext.ListExtForTheCategoryRes{
				Id:             item.Id,
				Label:          item.Label,
				Icon:           item.Icon,
				ChildrenAsInfo: c,
			})
		}
	}
	OKLa(c, DoListRes(filteredArr))
}

func ListCategory(c *gin.Context) {
	wc := context.WebContext{GinContext: c}
	b, e := ext.GetAllCategory(&wc)
	if e != nil {
		ErrLa(c, e)
		return
	}
	OKLa(c, DoListRes(b))
}
