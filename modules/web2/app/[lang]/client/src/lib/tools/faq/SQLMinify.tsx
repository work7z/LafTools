// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 27 Jan 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
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

import { loadDOT } from "../../../reducers/systemSlice";
import { Dot } from "../../../utils/cTranslationUtils";
import CommonMinify from "./CommonMinify";
import sameFAQs from "./SQLBeautify";

import { FAQItem } from "./types";
import React from "react";

loadDOT("C8airO3gW")

export default (): FAQItem[] => {
    return [
        ...CommonMinify(),
        ...sameFAQs()
    ]
}