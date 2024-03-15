'use client'

import React, { useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { Dot } from "@/app/__CORE__/utils/cTranslationUtils";
import { loadDOT } from "@/app/__CORE__/utils/i18n-types";
import { useInitFunctionOnceOnly } from "@/app/__CORE__/hooks/cache";

let a = loadDOT("Eitx--UjueC")

let prevEvents = []

export default () => {
    useEffect(() => {
        document.querySelectorAll("[data-navid]").forEach(x => {
            let navid = x.getAttribute("data-navid")
            let overlap = document.getElementById("navbindid-" + navid)
            if (!overlap) {
                alert('no overlap')
            }
            x.addEventListener("mouseenter", (e) => {
                e.preventDefault()
                let rect = x.getBoundingClientRect()
                if (!overlap) return
                overlap.style.top = (rect.top + rect.height) + "px"
                overlap.style.left = rect.left + "px"
                overlap.style.display = "block"
                // setTimeout(() => {
                //     if (!overlap) return
                //     overlap.style.opacity = "80"
                // }, 30)
            });
            let cancelHideId = 'EOqvni-md'
            let prevNavEle = 'XltbzkVbL'
            overlap?.addEventListener('mouseenter', () => {
                window.clearTimeout(window[cancelHideId])
                let ele: Element = window[prevNavEle]
                ele.className = ele.className + ' hover '
            })
            overlap?.addEventListener('mouseleave', () => {
                let ele: Element = window[prevNavEle]
                ele.className = ele.className.replace("hover", "")
                window[cancelHideId] = setTimeout(() => {
                    if (!overlap) return
                    overlap.style.display = "none"
                }, 20)
            })
            x.addEventListener("mouseout", (e) => {
                e.preventDefault()
                window[prevNavEle] = x;
                window[cancelHideId] = setTimeout(() => {
                    if (!overlap) return
                    window[prevNavEle] = null;
                    overlap.style.display = "none"
                }, 20)
                // overlap.style.opacity = "10"
                // setTimeout(() => {
                //     if (!overlap) return
                // }, 20)
            })
        })
    }, ["d9HrtsmHO"])
    return ''
}