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

import { useEffect, useState } from 'react';

import { DatePicker3, TimePrecision } from "@blueprintjs/datetime2";
import { Classes } from '@blueprintjs/core';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// type ValuePiece = Date | null;

// <Calendar onChange={onChange} value={value} locale={"zh-CN"} />
// type Value = ValuePiece | [ValuePiece, ValuePiece];
export default () => {
    // const [value, onChange] = useState<Value>(new Date());

    return <>
        <DatePicker3
            className={Classes.ELEVATION_1}
            dayPickerProps={{ showOutsideDays: false, showWeekNumber: false }}
            footerElement={undefined}
            onChange={() => {

            }}
            timePickerProps={{
                precision: TimePrecision.MINUTE,
                useAmPm: true,
                showArrowButtons: true,
            }}
        />
    </>
}