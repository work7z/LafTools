// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 5 Nov 2023
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
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"laftools-go/core/codec"
	"laftools-go/core/context"
	"laftools-go/core/form"
	"laftools-go/core/nocycle"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"

	"github.com/dablelv/cyan/crypto"
	"github.com/deatil/go-hash/hash"
	"github.com/spf13/cobra"
)

// other things

// define a key-value map for FunctionMap
type FunctionMap = form.ExtensionFuncMap

var cached_FNMap FunctionMap

var (
	arg_ReqFile    string
	arg_WCFile     string
	arg_ResultFile string
	arg_FnMap      string
	arg_Type       string
)

func InitCMD(cmd *cobra.Command) {
	cmd.PersistentFlags().StringVar(&arg_FnMap, "fn-map-id", "nil", "")
	cmd.PersistentFlags().StringVar(&arg_Type, "type", "nil", "what is your type?")
	cmd.PersistentFlags().StringVar(&arg_ReqFile, "req-file", "nil", "text request config in json format")
	cmd.PersistentFlags().StringVar(&arg_WCFile, "wc-file", "nil", "WebContext config in json format, it's coming from WebContext definition.")
	cmd.PersistentFlags().StringVar(&arg_ResultFile, "rs-file", "nil", "result")
}
func RunCMD(cmd *cobra.Command, args []string) {
	if arg_ReqFile == "nil" {
		cmd.Help()
		return
	}
	if arg_WCFile == "nil" {
		cmd.Help()
		return
	}
	var request form.ValueReq
	json_ReqFile, _ := nocycle.ReadFileAsStrWithNoTrim(arg_ReqFile)
	json_WCFile, _ := nocycle.ReadFileAsStrWithNoTrim(arg_WCFile)

	initTestDB()

	if arg_Type == "call-by-fn-map" {
		err := json.Unmarshal([]byte(json_ReqFile), &request)
		wc, err2 := context.NewWCFromJSON(json_WCFile)
		if err2 != nil {
			panic(err2)
		}
		var writeAnyToResultFile = func(any interface{}) {
			if arg_ResultFile != "nil" {
				// write to file
				bytes, _ := json.Marshal(any)
				fmt.Println(string(bytes))
			}
		}
		if err != nil {
			writeAnyToResultFile(form.ValueRes{
				Err:        err,
				OutputText: "unknown error handler",
				OutputFile: "",
			})
		} else {
			crtMap := GetAllFNMap(nil)[arg_FnMap]
			fmt.Println("wc is ", wc)
			rs := crtMap.ConvertText(request)
			nocycle.WriteObjectIntoFileWithMergeChecking(arg_ResultFile, rs)
		}
	}
}

func initTestDB() {
	// mkdir nocycle.CodeGenGoRoot+"/tmp
	nocycle.MkdirFile(nocycle.LafToolsAppBaseDir + "/tmp")

	db, err := sql.Open("sqlite3", nocycle.LafToolsAppBaseDir+"/tmp/test.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)")
	if err != nil {
		log.Fatal(err)
	}

	stmt, err := db.Prepare("INSERT INTO users(name) VALUES(?)")
	if err != nil {
		log.Fatal(err)
	}

	res, err := stmt.Exec("John Doe")
	if err != nil {
		log.Fatal(err)
	}

	lastID, err := res.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted user with ID:", lastID)

}

func GetAllFNMap(wc *context.WebContext) FunctionMap {
	if wc == nil {
		wc2, err2 := context.NewWCFromSystemDefault()
		nocycle.ShouldNoErr(err2, "Unknown error wc from system default")
		wc = wc2
	}
	ctx := wc
	fmt.Println("ctx", ctx)
	var FNMap FunctionMap = FunctionMap{
		"md2": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				GetMD2Str_tmp := func(str string) string {
					return hash.FromString(str).MD2().ToHexString()
				}
				return form.ValueRes{
					OutputText: GetMD2Str_tmp(request.InputText),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileMD2_tmp := func(request form.TextRequest) (string, error) {
					return codec.FileMD2(request.InputFile)
				}
				md2, err := GetFileMD2_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: md2,
				}
			},
		},
		"md5": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				return form.ValueRes{
					OutputText: GetMD5ForText(form.TextRequest{
						InputText: request.InputText,
					}),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				md5, err := GetFileMD5(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: md5,
				}
			},
		},
		"md4": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				GetMD4Str_tmp := func(str string) string {
					return hash.FromString(str).MD4().ToHexString()
				}
				return form.ValueRes{
					OutputText: GetMD4Str_tmp(request.InputText),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileMD4_tmp := func(request form.TextRequest) (string, error) {
					return codec.FileMD4(request.InputFile)
				}
				md4, err := GetFileMD4_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: md4,
				}
			},
		},
		"sha224": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				// func byte to hex string
				sha224 := sha256.New224()
				b := sha224.Sum([]byte(request.InputText))
				return form.ValueRes{
					OutputText: fmt.Sprintf("%x", b),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileSHA_tmp := func(request form.TextRequest) (string, error) {
					filePath := request.InputFile
					file, err := os.Open(filePath)
					if err != nil {
						return "", err
					}
					hash := sha256.New224()
					_, _ = io.Copy(hash, file)
					return hex.EncodeToString(hash.Sum(nil)), nil
				}
				sha, err := GetFileSHA_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: sha,
				}
			},
		},
		"sha384": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				// func byte to hex string
				sha384 := sha512.New384()
				b := sha384.Sum([]byte(request.InputText))
				return form.ValueRes{
					OutputText: fmt.Sprintf("%x", b),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileSHA_tmp := func(request form.TextRequest) (string, error) {
					filePath := request.InputFile
					file, err := os.Open(filePath)
					if err != nil {
						return "", err
					}
					hash := sha512.New384()
					_, _ = io.Copy(hash, file)
					return hex.EncodeToString(hash.Sum(nil)), nil
				}
				sha, err := GetFileSHA_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: sha,
				}
			},
		},
		"sha512": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				// func byte to hex string
				sha512 := sha512.New()
				b := sha512.Sum([]byte(request.InputText))
				return form.ValueRes{
					OutputText: fmt.Sprintf("%x", b),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileSHA_tmp := func(request form.TextRequest) (string, error) {
					filePath := request.InputFile
					file, err := os.Open(filePath)
					if err != nil {
						return "", err
					}
					hash := sha512.New()
					_, _ = io.Copy(hash, file)
					return hex.EncodeToString(hash.Sum(nil)), nil
				}
				sha, err := GetFileSHA_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: sha,
				}
			},
		},
		"sha256": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				// func byte to hex string
				sha256 := sha256.New()
				b := sha256.Sum([]byte(request.InputText))
				return form.ValueRes{
					OutputText: fmt.Sprintf("%x", b),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileSHA_tmp := func(request form.TextRequest) (string, error) {
					filePath := request.InputFile
					file, err := os.Open(filePath)
					if err != nil {
						return "", err
					}
					hash := sha256.New()
					_, _ = io.Copy(hash, file)
					return hex.EncodeToString(hash.Sum(nil)), nil
				}
				sha, err := GetFileSHA_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: sha,
				}
			},
		},
		"sha1": &form.ValueHandler{
			ConvertText: func(request form.ValueReq) form.ValueRes {
				// func byte to hex string
				b := sha1.Sum([]byte(request.InputText))
				return form.ValueRes{
					OutputText: fmt.Sprintf("%x", b),
				}
			},
			ConvertFile: func(request form.ValueReq) form.ValueRes {
				GetFileSHA_tmp := func(request form.TextRequest) (string, error) {
					filePath := request.InputFile
					file, err := os.Open(filePath)
					if err != nil {
						return "", err
					}
					hash := sha1.New()
					_, _ = io.Copy(hash, file)
					return hex.EncodeToString(hash.Sum(nil)), nil
				}
				sha, err := GetFileSHA_tmp(form.TextRequest{
					InputFile: request.InputFile,
				})
				if err != nil {
					return form.ValueRes{
						Err:        err,
						OutputText: "",
						OutputFile: "",
					}
				}
				return form.ValueRes{
					OutputText: sha,
				}
			},
		},
	}
	return FNMap
}

func GetFileMD2(request form.TextRequest) (string, error) {
	return codec.FileMD2(request.InputFile)
}

func GetMD2Str(str string) string {
	return hash.FromString(str).MD2().ToHexString()
}

func GetMD2ForText(request form.TextRequest) string {
	return GetMD2Str(request.InputText)
}

func GetFileMD5(request form.TextRequest) (string, error) {
	return codec.FileMD5(request.InputFile)
}

func GetMD5ForText(request form.TextRequest) string {
	return crypto.Md5(request.InputText)
}
