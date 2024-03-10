// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Mon, 15 Jan 2024
// Author: Ryan Laf <work7z@outlook.com>
// Description:
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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

package sysmodel

import "time"

type UserConfig struct {
	Id             string
	Username       string
	Password       string
	Token          string
	CreateTime     time.Time
	IsAdmin        bool
	InvitationCode string
}
type UserConfigMap = map[string]UserConfig

type SystemInfo struct {
	HasAdminInit    bool      `json:"HasAdminInit"`
	LastUpdatedTime time.Time `json:"LastUpdatedTime"`
}
