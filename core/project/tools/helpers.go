// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Thu, 21 Dec 2023
// Author: LafTools Team - FX <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laftools.dev and https://codegen.cc
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

package tools

import (
	"crypto/md5"
	"encoding/hex"
	"io"
	"laftools-go/core/project/base/form"
	"os"

	"github.com/dablelv/cyan/crypto"
	"github.com/deatil/go-hash/hash"
	"github.com/deatil/go-hash/md2"
	"golang.org/x/crypto/md4"
)

func GetFileMD2(request form.TextRequest) (string, error) {
	return FileMD2(request.InputFile)
}

func GetMD2Str(str string) string {
	return hash.FromString(str).MD2().ToHexString()
}

func GetMD2ForText(request form.TextRequest) string {
	return GetMD2Str(request.InputText)
}

func GetFileMD5(request form.TextRequest) (string, error) {
	return FileMD5(request.InputFile)
}

func GetMD5ForText(request form.TextRequest) string {
	return crypto.Md5(request.InputText)
}

func FileMD5(filePath string) (string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	hash := md5.New()
	_, _ = io.Copy(hash, file)
	return hex.EncodeToString(hash.Sum(nil)), nil
}

func FileMD2(filePath string) (string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	hash := md2.New()
	_, _ = io.Copy(hash, file)
	return hex.EncodeToString(hash.Sum(nil)), nil
}

func FileMD4(filePath string) (string, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return "", err
	}
	hash := md4.New()
	_, _ = io.Copy(hash, file)
	return hex.EncodeToString(hash.Sum(nil)), nil
}
