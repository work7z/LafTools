// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 22 Oct 2023
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
	"io"
	"laftools-go/core/config"
	"laftools-go/core/context"
	"laftools-go/core/gutils"
	"laftools-go/core/nocycle"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

type FileInfo struct {
	RefID    string
	FileSize int
	FileName string
}

func API_TEMP_FILE_READ(c *gin.Context) {
	// Check if the request method is GET
	if c.Request.Method != "GET" {
		c.AbortWithStatus(http.StatusMethodNotAllowed)
		return
	}
	wc := context.NewWC(c)

	// Get the file name from the GET parameters
	filename := c.Query("refID")
	if filename == "" {
		c.AbortWithStatus(http.StatusBadRequest)
		ErrLa2(c, wc.Dot("5ifiP", "File Not Found"))
		return
	}

	// Set the path to the file
	tempDir := config.GetAppTempUploadDir()
	filepath := filepath.Join(tempDir, filename)

	// Check if the file exists and is not a directory
	fileInfo, err := os.Stat(filepath)
	if os.IsNotExist(err) || fileInfo.IsDir() {
		ErrLa(c, err)
		return
	}

	// read filename as string,
	// and return it as a response
	a, b := nocycle.ReadFileAsStrWithNoTrim(filepath)
	if b != nil {
		ErrLa(c, b)
		return
	}
	OKLa(c, DoValueRes(gin.H{
		"content": a,
	}))
}

type OsOpenForm struct {
	Dir string `json:"dir"`
}

func API_File_ExistOrNot(c *gin.Context) {
	var openForm = &OsOpenForm{}
	c.BindJSON(openForm)
	OKLa(c, DoValueRes(nocycle.IsFileExist(openForm.Dir)))
}

func API_File_Mkdir(c *gin.Context) {
	var openForm = &OsOpenForm{}
	c.BindJSON(openForm)
	OKLa(c, DoValueRes(nocycle.MkdirFileWithStr(openForm.Dir)))
}

func API_OS_OPENDIR(c *gin.Context) {
	var openForm = &OsOpenForm{}
	c.BindJSON(openForm)
	err := nocycle.OpenDir(openForm.Dir)
	if err != nil {
		ErrLa(c, err)
	} else {
		OKLa(c, DoValueRes(1))
	}
}

// complete a function API_TEMP_FILE_UPLOAD, which will be used in core/api/Route.go, and saving the uploaded file to the directory core/config/ConfigPath.go:GetAppTempUploadDir()
func API_TEMP_FILE_UPLOAD(c *gin.Context) {
	// Check if the request method is POST
	if c.Request.Method != "POST" {
		c.AbortWithStatus(http.StatusMethodNotAllowed)
		return
	}

	// Parse the multipart form data
	err := c.Request.ParseMultipartForm(1 << 30) // 1 GB
	if err != nil {
		ErrLa(c, err)
		return
	}

	// Get the file from the form data
	file, handlers, err := c.Request.FormFile("file")
	refID := gutils.UUID()
	if err != nil {
		ErrLa(c, err)
		return
	}
	defer file.Close()

	// Create a new file on the server
	tempDir := config.GetAppTempUploadDir()

	// clean historical files under tempDir which was created 1 hours ago
	gutils.CleanHistoricalFilesByHour(tempDir, 1)

	err = os.MkdirAll(tempDir, os.ModePerm)
	if err != nil {
		ErrLa(c, err)
		return
	}
	f, err := os.OpenFile(filepath.Join(tempDir, refID), os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		ErrLa(c, err)
		return
	}
	defer f.Close()

	// Copy the file data to the new file
	_, err = io.Copy(f, file)
	if err != nil {
		ErrLa(c, err)
		return
	}

	// Return a success message
	OKLa2(c, DoValueRes(FileInfo{
		RefID:    refID,
		FileSize: int(handlers.Size),
		FileName: handlers.Filename,
	}))

}
