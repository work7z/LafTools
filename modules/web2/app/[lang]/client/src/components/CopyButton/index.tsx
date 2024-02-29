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
import { Dot } from "../../utils/cTranslationUtils"

export default (props: {
    enableTextMode?: boolean,
    onCopy: () => any,
    extraButtonProps?: ButtonProps,
    placement?: Placement,
}) => {
    let [mouseEnter, onMouseEnter] = useState(false)
    let [copied, setCopied] = useState(false)
    let operaRef = useRef({
        copyTimestamp: 0,
        releaseCopyEventFn: () => { },
    })
    let [times, setTimes] = useState(0)
    let title = copied ? Dot("psqqpq_o", "Okay, the result has been copied to your clipboard for {0} times.", times) : Dot("2JyFN", "Copy Result to Clipboard")
    let [isOpen, setIsOpen] = useState(false)

    let btn = <Button
        className=" transition-colors "
        onMouseEnter={() => {
            setIsOpen(true)
            onMouseEnter(true)
        }}
        onMouseLeave={() => {
            setIsOpen(false)
            onMouseEnter(false)
            operaRef.current.releaseCopyEventFn()
        }}
        onClick={() => {
            let v = (new Date().getTime())
            operaRef.current.copyTimestamp = v
            operaRef.current.releaseCopyEventFn = () => { }
            props.onCopy()
            setCopied(true)
            setTimes(times + 1)
            setTimeout(() => {
                if (operaRef.current.copyTimestamp != v) return;
                let fn = () => {
                    setCopied(false)
                }
                // if (mouseEnter) {
                //     operaRef.current.releaseCopyEventFn = fn
                //     return;
                // }
                fn()
            }, 1200)
        }} icon={copied ? "tick" : "duplicate"} text={props.enableTextMode ? (
            copied ? Dot("-8l11", "Copied") : Dot("gK3dNQ", "Copy")
        ) : ''} intent="success" minimal={props.enableTextMode ? (
            copied ? true : false
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