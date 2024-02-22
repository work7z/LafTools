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
let randomColor = _.get(colorList, _.random(0, _.size(colorList) - 1));

export default (props) => {

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
            shallowRouting
        />
    </>
}