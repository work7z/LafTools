// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Fri, 8 Mar 2024
// Author:   
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

import info from '@/app/[lang]/info'
// write a full page component that has loading animation
// import ExtraLoadingBar from './ExtraLoadingBar'
import { getIconPngFileWithoutClient as getIconPngFileWithoutClient } from "@/app/[lang]/client/src/noclient";

export default function PageLoadingEffect() {
    return (
        <div className="w-full h-full absolute">
            <div className="w-full h-full  z-50 absolute left-0 top-0  bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                {/* <div className="w-10 h-10 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div> */}
                <div className="text-center text-gray-500 dark:text-gray-100 space-y-[5px] flex items-center justify-center flex-col">
                    <div>
                        <img className="w-10 h-10 animate-pulse " src={"/static/" + getIconPngFileWithoutClient()}></img>
                    </div>
                    <div className="text- " style={{ fontSize: '10px' }}>LafTools {info.version}</div>
                    <div>
                        <div className="w-10 h-1 bg-green-500  rounded-full animate-pulse"></div>
                    </div>
                </div>
                {/* <ExtraLoadingBar /> */}
            </div>
        </div>
    )
}