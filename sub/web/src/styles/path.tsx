// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 1 Oct 2023
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

export const URL_WORKBENCH = "/workbench";
export const URL_ENTRY = "/entry";

export const ID_TOOLS = "tools";
export const ID_FILES = "files";
export const ID_NOTES = "notes";
export const ID_HISTORY = "history";

export const URL_WORKBENCH_WORKSPACE = URL_WORKBENCH ;

// main urls
export const URL_WORKBENCH_TOOLS = URL_WORKBENCH + "/tools";
export const URL_WORKBENCH_FILES = URL_WORKBENCH + "/files";
export const URL_WORKBENCH_NOTES = URL_WORKBENCH + "/notes";
export const URL_WORKBENCH_MANUALS = URL_WORKBENCH + "/manuals";

// sub urls
export const SUB_URL_WORKBENCH_TOOLS_CATEGORY =
  URL_WORKBENCH_TOOLS + "/:category?/:extId?";
