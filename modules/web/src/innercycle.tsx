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

import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { RootState } from "./store";
import { LANG_EN_US } from "./styles/var";

interface InnerCycle {
  CachedLanguage: string | null;
}
const INNER_CYCLE: InnerCycle = {
  CachedLanguage: null,
};

export default INNER_CYCLE;
