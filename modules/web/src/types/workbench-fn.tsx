// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sun, 24 Dec 2023
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

import { Dot } from "../utils/TranslationUtils"

export let fn_format_description = (desc: string | undefined): string => {
    return Dot("rT4qnO","Enter text for processing. The result will display in the output editor.")+"\n\n"+Dot("PyYaq","Introduction: ")+"\n"+desc?.replace(/\\n/g, '\n') || ''
}