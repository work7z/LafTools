// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 13 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
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

export type GO_LOCAL_API_VISIT_CreateAdminInitStatusForm = {
  username: string;
  password: string;
};
export type GO_LOCAL_CategoryDefinition = {
  id: string;
  label: string;
};
export type GO_LOCAL_CreateNewAccounttForm = {
  username: string;
  password: string;
  token: string;
  invitationCode: string;
};
export type GO_LOCAL_VerifyUserServletForm = {
  username: string;
  password: string;
  token: string;
};
export type GO_LOCAL_CalcPasswordForm = {
  pw: string;
};
export type GO_LOCAL_Menu = {
  root: boolean;
  label: string;
  icon: string;
  id: string;
};
export type GO_LOCAL_DevFileStruct = {
  token: string;
};
export type GO_LOCAL_UserConfigMap = {
  userConfigFile: any;
  return: any;
};
export type GO_LOCAL_SystemInfo = {
  HasAdminInit: boolean;
  LastUpdatedTime: Date;
};
export type GO_LOCAL_ValueHandler = {
  ConvertText: any;
  ConvertFile: any;
};
export type GO_LOCAL_Select = {
  GetDynamicList: any;
};
