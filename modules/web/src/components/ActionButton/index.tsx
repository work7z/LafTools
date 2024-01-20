// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 13 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
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

import { Button, ButtonProps, Placement, Tooltip } from "@blueprintjs/core"
import { useRef, useState } from "react"
import { Dot } from "../../utils/TranslationUtils"

export default (props: ButtonProps & {
    enableTextMode?: boolean,
    onCopy: () => any,
    extraButtonProps?: ButtonProps,
    placement?: Placement,
    // text format
    actionText: string;
    afterActionText: string;
    lastingTime?: number; // by defaults, it's 3000ms
}) => {
    let [triggered, setTrigger] = useState(false)
    let operaRef = useRef({
        copyTimestamp: 0,
        releaseCopyEventFn: () => { },
    })
    let title = triggered ? props.afterActionText : props.actionText
    let [isOpen, setIsOpen] = useState(false)

    let btn = <Button
        {...props}
        className={" transition-colors " + " " + props.className}
        onMouseEnter={() => {
            setIsOpen(true)
        }}
        onMouseLeave={() => {
            setIsOpen(false)
            operaRef.current.releaseCopyEventFn()
        }}
        onClick={() => {
            let v = (new Date().getTime())
            operaRef.current.copyTimestamp = v
            operaRef.current.releaseCopyEventFn = () => { }
            props.onCopy()
            setTrigger(true)
            setTimeout(() => {
                if (operaRef.current.copyTimestamp != v) return;
                let fn = () => {
                    setTrigger(false)
                }
                // if (mouseEnter) {
                //     operaRef.current.releaseCopyEventFn = fn
                //     return;
                // }
                fn()
            }, props.lastingTime || 3000)
        }} icon={triggered ? "tick" : "duplicate"} text={props.enableTextMode ? (
            triggered ? Dot("-8l11", "Copied") : Dot("gK3dNQ", "Copy")
        ) : ''} intent="success" minimal={props.enableTextMode ? (
            triggered ? true : false
        ) : true} {...(props.extraButtonProps || {})} ></Button>
    if (!props.enableTextMode) return btn;
    return <Tooltip
        isOpen={isOpen}
        // onInteraction={(v) => {
        //     setIsOpen(v)
        // }}
        content={title} placement={props.placement || "bottom"} >
        {btn}
    </Tooltip>
}