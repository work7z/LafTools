// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 13 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
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

import { Button, ButtonProps, Intent, Placement, Popover, Tooltip } from "@blueprintjs/core"
import { useRef, useState } from "react"
import { Dot } from "../../utils/cTranslationUtils"
import { TOOLTIP_OPEN_DELAY_BTN } from "@/app/__CORE__/meta/constants";

export type ActionButtonProps = ButtonProps & {
    doNotBeMinimalWhenTrigger?: boolean;
    highlightOne?: boolean;
    extraButtonProps?: ButtonProps,
    popoverItem?: JSX.Element,
    parentTriggered?: boolean;
    placement?: Placement,
    enableActionMode?: boolean,
    // text format
    afterTitle?: string;
    afterText?: string;
    afterIntent?: Intent,
    lastingTime?: number; // by defaults, it's 3000ms
}

export default (props: ActionButtonProps) => {
    let enableTextMode = true;
    // let [parentTriggered, setParentTriggered] = useState(false)
    let { parentTriggered } = props;
    let [triggered, setTrigger] = useState(false)
    let operaRef = useRef({
        copyTimestamp: 0,
        releaseCopyEventFn: () => { },
    })
    let title = triggered ? props.afterTitle : props.title
    let [isOpen, setIsOpen] = useState(false)
    let isMinimal = props.extraButtonProps?.minimal || props.doNotBeMinimalWhenTrigger ? false : enableTextMode ? (
        triggered ? true : false
    ) : true
    let btn = <Button
        {...props}
        title={''}
        className={" transition-colors " + " " + props.className}
        onMouseEnter={() => {
            setIsOpen(true)
        }}
        onMouseLeave={() => {
            setIsOpen(false)
            operaRef.current.releaseCopyEventFn()
        }}
        onClick={async (e) => {
            if (
                props.onClick
            ) {
                await props.onClick(e)
            }
            if (!props.enableActionMode) {
                return;
            }
            let v = (new Date().getTime())
            operaRef.current.copyTimestamp = v
            operaRef.current.releaseCopyEventFn = () => { }
            setTrigger(true)
            setTimeout(() => {
                if (operaRef.current.copyTimestamp != v) return;
                let fn = () => {
                    setTrigger(false)
                }
                fn()
            }, props.lastingTime || 1200)
        }} icon={triggered || (props.intent == 'primary' && props.highlightOne && parentTriggered) ? "tick" : props.icon} text={enableTextMode ? (
            triggered ? props.afterText : props.text
        ) : ''} intent={triggered && props.afterIntent ? props.afterIntent : props.intent || "success"} minimal={isMinimal} {...(props.extraButtonProps || {})} ></Button>
    let tooltipCtn = <Tooltip
        isOpen={isOpen}
        // hoverOpenDelay={TOOLTIP_OPEN_DELAY_BTN}
        content={title} placement={props.placement || "bottom"} >
        {btn}
    </Tooltip>
    if (props.popoverItem) {
        return <Popover
            content={props.popoverItem} placement={props.placement || "bottom"} >
            {tooltipCtn}
        </Popover>
    }
    return tooltipCtn
}