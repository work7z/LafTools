'use client'

import React from 'react';
import '../../script/preline-init'
import { Dot } from '../../utils/ClientTranslationUtils';
import os from 'os'
import path from 'path';
import { readFileSync } from 'fs';
import { loadDOT } from '@/app/[lang]/register/i18n-types';

let a = loadDOT("lAz69eiBk")

export default (props: { codeImgBase64?: string, vcodeFactor: number }) => {
    a()
    let [ts, onTS] = React.useState(Date.now())
    return (
        <div className="">
            <label className="block text-sm mb-2 dark:text-white w-full ">{Dot("ChsJp", "CAPTCHA")}</label>
            <div className="relative">
                <input name='vcode' id="hs-toggle-password" type="text" className="py-3 px-4 block w-full border-gray-200  border-[1px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder={Dot("fnV5h", "Enter Image Verification Code")} />
            </div>
            <div className='mt-2'>
                <img className='hover:cursor-pointer min-h-20 min-w-[1/5] bg-slate-300' src={'/api/captcha?t=' + ts + '-' + props.vcodeFactor} onClick={() => {
                    onTS(ts + 1)
                }}  ></img>
                <div className='text-right'>
                </div>
            </div>

        </div>
    )
}