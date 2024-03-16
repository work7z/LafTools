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