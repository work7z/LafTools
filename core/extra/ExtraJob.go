// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 16 Dec 2023
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

package extra

import (
	"bufio"
	"fmt"
	"laftools-go/core/env"
	"laftools-go/core/gutils"
	"laftools-go/core/log"
	"laftools-go/core/nocycle"
	"os"
	"os/exec"
	"strings"

	"github.com/spf13/cobra"
)

type Job struct {
	Name     string   `json:"Name"`
	Type     string   `json:"Type"`
	Commands []string `json:"Commands,omitempty"`
}

type Config struct {
	Env       []string `json:"Env"`
	LockFile  bool     `json:"LockFile"`
	OutputDir string   `json:"OutputDir"`
	Jobs      []Job    `json:"Jobs"`
}

var DefaultConfigFile string

func HandleExtraAction(cmd *cobra.Command, args []string) {
	env.ENV_ShouldPrintLogAsJSON = false
	log.Ref().Debug("calling extra action")
	log.Ref().Debug("DefaultConfigFile: ", DefaultConfigFile)
	lckFile := DefaultConfigFile + ".lck"
	log.Ref().Debug("lckFile: ", lckFile)
	// write uuid into lckFile, and keep that uuid. once the uuid is not matched with lckFile, then exit
	crtUUID := gutils.UUID()
	log.Ref().Debug("crtUUID: ", crtUUID)
	nocycle.WriteStrIntoFile(lckFile, crtUUID)
	go func() {
		for {
			// read uuid from lckFile, and compare with crtUUID
			// if not matched, then exit
			// if matched, then sleep 2s
			if nocycle.IsFileExist(lckFile) {
				uuid := nocycle.ReadFileAsString(lckFile)
				if uuid != crtUUID {
					log.Ref().Debug("uuid not matched, exit")
					nocycle.Exit(0)
				}
			} else {
				log.Ref().Debug("lckFile not exist, exit")
				nocycle.Exit(0)
			}
			nocycle.Sleep(2000)
		}
	}()

	crtConfig := Config{}
	// unmarshal DefaultConfigFile into crtConfig
	e := nocycle.ReadFileAsJson(DefaultConfigFile, &crtConfig)
	if e != nil {
		log.Ref().Debug("read config file failed, exit")
		nocycle.Exit(0)
	}
	// log.Ref().Debug("crtConfig: ", crtConfig)
	// run commands for each job, remember to set env, and print output to the folder OutputDir
	for _, job := range crtConfig.Jobs {
		// set env
		go func(job Job) {
			// if strings.Index(job.Name, "Scan") == -1 {
			// return
			// }
			log.Ref().Debug("job: ", job)
			// for each job.Commands, and replace their value with env
			for _, env := range crtConfig.Env {
				for idx, eachCmd := range job.Commands {
					eachCmd = strings.ReplaceAll(eachCmd, "$"+env, os.Getenv(env))
					job.Commands[idx] = eachCmd
				}
			}

			// trigger command by go command
			mainProgram := job.Commands[0]
			extArr := make([]string, 0)
			extArr = job.Commands[1:]
			cmd := exec.Command(mainProgram, extArr...)
			// get all output in cmd as a string, and convert it as NodeRes struct, note that return error if any
			// add env into cmd
			cmd.Env = os.Environ()

			log.Ref().Debug("cmd is ", extArr)

			// var out bytes.Buffer
			// var stderr bytes.Buffer
			// cmd.Stdout = &out
			// cmd.Stderr = &stderr

			stdout, _ := cmd.StdoutPipe()
			stderr, _ := cmd.StderrPipe()

			go func() {
				scanner := bufio.NewScanner(stdout)
				for scanner.Scan() {
					fmt.Println(scanner.Text()) // or send to a logger, etc.
				}
			}()

			go func() {
				scanner := bufio.NewScanner(stderr)
				for scanner.Scan() {
					fmt.Println(scanner.Text()) // or send to a logger, etc.
				}
			}()

			err := cmd.Start()
			if err != nil {
				log.InternalLog.Fatal(err)
				os.Exit(99)
			}

			err = cmd.Wait()
			if err != nil {
				log.InternalLog.Fatal(err)
				os.Exit(99)
			}

			// err := cmd.Run()
			// if err != nil {
			// 	errValue := fmt.Sprint(err) + ": " + stderr.String()
			// 	log.Ref().Debug("could not execute cmd.output", errValue, " and output is ", out)
			// 	os.Exit(99)
			// }
			// outStr := out.String()
			// log.Ref().Debug("cmd.output is ", outStr)
		}(job)
	}
	select {}
}
