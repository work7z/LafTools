'use client'

import React, { useEffect } from 'react';
import { Dot } from '../../utils/TranslationUtils';
export default (props:{name:string}) => {
    let [value, setValue] = React.useState('')
    useEffect(() => {
        setValue(localStorage.getItem(props.name)||'')
    },[])

    return (
        <div className=''>
        <label htmlFor="hs-leading-icon" className="block text-sm font-medium mb-2 dark:text-white">{Dot("-q2b4d","Username")}</label>
        <div className="relative">
            <input value={value} onChange={e=>{
                setValue(e.target.value)
                localStorage.setItem(props.name,e.target.value)
            }} name='username' type="text" id="hs-leading-icon"  className="py-3 px-4 ps-11 block w-full border-gray-200 border-[1px]  rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder={Dot("VzKIn","Enter username")} />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
            <svg className="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
        </div>
    </div>
    )
}

