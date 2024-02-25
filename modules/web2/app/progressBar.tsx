// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
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

'use client'

import _ from 'lodash';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import React from 'react';


let colorList = [
    '#ADFF2F', // GreenYellow
    "#13C9BA",
    "#D4F17E",
    "#62D96B",
    "#68C1EE",
    "#D69FD6",
    "#BDADFF",
    "#7961DB",
    "#F5498B",
    "#D0B090",
    "#FBD065",
    "#FF66A1",
    "#FBB360",
    "#8ABBFF",
    "#238551",
    "#EC9A3C",
    "#5C255C"
]

// 1. import `NextUIProvider` component
// import { NextUIProvider } from "@nextui-org/react";


export default (props) => {
    let randomColor = _.get(colorList, _.random(0, _.size(colorList) - 1));

    let [show, setShow] = React.useState(false);
    React.useEffect(() => {
        setShow(true);
    }, [])
    if (!show) return <></>

    return <>
        <ProgressBar
            height="4px"
            color={randomColor}
            options={{ showSpinner: true }}
        // shallowRouting
        />
    </>
}