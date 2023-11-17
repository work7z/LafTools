// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Mon, 18 Sep 2023
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

package log

import (
	"codegen-go/core/env"
	"os"

	"github.com/sirupsen/logrus"
)

// Create a new instance of the InternalLog.er. You can have any number of instances.
var InternalLog = logrus.New()

func Ref() *logrus.Logger {
	shouldOrNot := env.ENV_ShouldPrintLogAsJSON;
	if shouldOrNot {
		// InternalLog.as JSON instead of the default ASCII formatter.
		InternalLog.SetFormatter(&logrus.JSONFormatter{})
		// Output to stdout instead of the default stderr
		// Can be any io.Writer, see below for File example
		InternalLog.SetOutput(os.Stdout)
		// Only InternalLog.the warning severity or above.
		InternalLog.SetLevel(logrus.InfoLevel)
	} else {
		// while dev mode, using text formatter by default
		InternalLog.SetFormatter(&logrus.TextFormatter{})
		// Output to stdout instead of the default stderr
		// Can be any io.Writer, see below for File example
		InternalLog.SetOutput(os.Stdout)
		// Only InternalLog.the warning severity or above.
		InternalLog.SetLevel(logrus.DebugLevel)
	}
	InternalLog.SetFormatter(&logrus.JSONFormatter{})
	return InternalLog
}
