// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Wed, 18 Oct 2023
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

import { logutils } from "./LogUtils";

import _ from "lodash";
import { Dot } from "./TranslationUtils";
import { AxiosError } from "axios";
import { uuid } from "./g_ref";

let clientIdKey = "LafTools_CLIENT_ID";
let clientId = 'default';
// localStorage.getItem(clientIdKey);
// if (_.isNil(clientId)) {
//   clientId = uuid();
//   localStorage.setItem(clientIdKey, clientId);
// }

const IDUtils = {
  PAGE_ID: uuid(),
  CLIENT_ID: clientId,
};
export default IDUtils;
