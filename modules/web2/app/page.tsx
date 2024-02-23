// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 8 Feb 2024
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

import _ from 'lodash';
import Page, { CombindSearchProps, generateMetadata } from './[lang]/page'
import getAuthInfo, { AuthInfo } from "@/app/__CORE__/containers/GrailLayoutWithUser/actions/handleAuthInfo";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "purecss/build/pure.css";
import "purecss/build/grids-responsive-min.css";


export default Page
export { generateMetadata }