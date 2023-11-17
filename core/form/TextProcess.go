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

package form

type ExtraConfig = map[string]string

type TextRequest struct {
	UsingInputText bool
	UsingInputFile bool
	InputCharset   string
	OutputCharset  string
	InputText      string
	InputFile      string // file path
	ExtraConfigMap *ExtraConfig
}

// type TextResponse struct {
// 	CallLevel string // where is this message from? nil means it's coming from fnmap
// 	Status    int    // 0 ok, other means warnings or errors
// 	Result    interface{}
// 	Messages  []string
// 	Warnings  []string
// 	Errors    []string
// 	Debugs    []string
// }
// type ProcessValueFunction = func(request TextRequest, ctx *context.WebContext) TextResponse

// type TextProcessAction struct {
// 	Id           string
// 	Label        string
// 	ProcessValue ProcessValueFunction
// }

// type TextProcessForm struct {
// 	Id                     string
// 	Label                  string
// 	Categories             []string
// 	Description            string
// 	Action                 []*TextProcessAction
// 	LoaderVariableMap      map[string]interface{}
// 	LoaderConfigJSON       string // to retrieve this value, please ensure you call load JSON config
// 	LoaderConfigJavaScript string
// }

// func FormatContentWithinForm(form *TextProcessForm, newStr string) string {
// 	if form.LoaderVariableMap != nil {
// 		for s, i := range form.LoaderVariableMap {
// 			newStr = strings.ReplaceAll(newStr, "@{"+s+"}", nocycle.ToAnyString(i))
// 		}
// 	}
// 	return newStr
// }

// func (tpf *TextProcessForm) LoadJSONConfig() {
// 	fullPath := filepath.Join(gutils.GetResourceFormDir(), tpf.Id+".json")
// 	config, err := nocycle.ReadFileAsStr(fullPath)
// 	if err != nil {
// 		log.Ref().Fatal(err)
// 	} else {
// 		tpf.LoaderConfigJSON = FormatContentWithinForm(tpf, config)
// 	}
// 	// javascript
// 	fullPathForJS := filepath.Join(gutils.GetResourceFormDir(), tpf.Id+".js")
// 	if nocycle.IsFileExist(fullPathForJS) {
// 		var a1, err = nocycle.ReadFileAsStr(fullPathForJS)
// 		if err != nil {
// 			log.Ref().Fatal("File Exist but failed to read the js, ", fullPathForJS)
// 		} else {
// 			tpf.LoaderConfigJavaScript = FormatContentWithinForm(tpf, a1)
// 		}
// 	}
// }
