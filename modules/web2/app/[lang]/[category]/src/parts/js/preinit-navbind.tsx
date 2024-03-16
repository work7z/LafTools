// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 16 Mar 2024
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

'use client'

import React, { useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Dot } from "@/app/__CORE__/utils/cTranslationUtils";
import { loadDOT } from "@/app/__CORE__/utils/i18n-types";
import { useInitFunctionOnceOnly } from "@/app/__CORE__/hooks/cache";

let a = loadDOT("Eitx--UjueC")

let prevEvents = {}

export default () => {
    useEffect(() => {
        document.querySelectorAll("[data-navid]").forEach(x => {
            let navid = x.getAttribute("data-navid")
            if (!navid) return
            let overlap = document.getElementById("navbindid-" + navid)
            if (!overlap) {
                alert('no overlap')
            }
            let cancelHideId = 'EOqvni-md' + navid
            let prevNavEle = 'XltbzkVbL' + navid
            let isOPHoving = "mocWB0BRW" + navid
            let isXHoving = 'krqEcIGgA"' + navid
            let eventObj = {
                x_mouseenter: (e) => {
                    e.preventDefault()
                    let rect = x.getBoundingClientRect()
                    if (!overlap) return
                    overlap.style.top = (rect.top + rect.height + 3) + "px"
                    // overlap.style.left = rect.left + "px"
                    overlap.style.display = "block"
                    overlap.style.left = rect.left + "px"
                    // overlap.style.left = rect.left - (overlap.getBoundingClientRect().width / 2 + rect.width / 2) + "px"
                    window[isXHoving] = '1'
                    setTimeout(() => {
                        if (!overlap) return
                        // overlap.style.opacity = "80"
                    }, 30)
                },
                x_mouseout: (e) => {
                    delete window[isXHoving]
                    e.preventDefault()
                    window[prevNavEle] = x;
                    window[cancelHideId] = setTimeout(() => {
                        if (!overlap) return
                        if (window[isOPHoving]) {
                            return;
                        }
                        window[prevNavEle] = null;
                        overlap.style.display = "none"
                    }, 70)
                },
                op_mouseenter: () => {
                    window[isOPHoving] = '1'
                    window.clearTimeout(window[cancelHideId])
                    let ele: Element = window[prevNavEle]
                    if (ele) {
                        ele.className = ele.className + ' hover '
                    }
                },
                op_mouseout: () => {
                    delete window[isOPHoving]
                    let ele: Element = window[prevNavEle]
                    if (ele) {
                        ele.className = ele.className.replace("hover", "")
                    }
                    window[cancelHideId] = setTimeout(() => {
                        if (!overlap) return
                        if (window[isXHoving]) {
                            return;
                        };
                        overlap.style.display = "none"
                    }, 20)
                }
            }
            // if (prevEvents[navid]) {
            //     x.removeEventListener("mouseenter", prevEvents[navid].x_mouseenter);
            //     overlap?.removeEventListener('mouseenter', prevEvents[navid].op_mouseenter)
            //     overlap?.removeEventListener('mouseleave', prevEvents[navid].op_mouseout)
            //     x.removeEventListener("mouseout", prevEvents[navid].x_mouseout)
            // }
            x.addEventListener("mouseenter", eventObj.x_mouseenter);
            overlap?.addEventListener('mouseenter', eventObj.op_mouseenter)
            overlap?.addEventListener('mouseleave', eventObj.op_mouseout)
            x.addEventListener("mouseout", eventObj.x_mouseout)
        })
    }, ["d9HrtsmHO"])
    return ''
}