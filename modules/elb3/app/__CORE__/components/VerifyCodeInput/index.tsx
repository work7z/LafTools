'use client'

import React from 'react';
import '../../script/preline-init'
import { Dot } from '../../utils/TranslationUtils';
import os from 'os'
import path from 'path';
import { readFileSync } from 'fs';


export default (props: { codeImgBase64: string }) => {
    let [ts, onTS] = React.useState(Date.now())
    return (
        <div className="">
            <label className="block text-sm mb-2 dark:text-white w-full ">{Dot("ChsJp", "CAPTCHA")}</label>
            <div className="relative">
                <input name='vcode' id="hs-toggle-password" type="password" className="py-3 px-4 block w-full border-gray-200  border-[1px] rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder={Dot("fnV5h", "Enter Image Verification Code")} />
            </div>
            <div className='mt-2'>
                <img className='hover:cursor-pointer' src={'/api/captcha?t=' + ts} onClick={() => {
                    onTS(ts + 1)
                }}  ></img>
                <div className=' text-right'>
                    {/* <a className='anchor-text text-sm' href="/reset-password">
                    {Dot("URlfVfY3I", "Refresh Code")}
                </a> */}
                </div>
            </div>

        </div>
    )
}