import React from 'react';
import { Dot } from '../../utils/TranslationUtils';
export default () => {
    return (
        <div className=''>
        <label htmlFor="hs-leading-icon" className="block text-sm font-medium mb-2 dark:text-white">{Dot("-YjLGS","Telephone Number")}</label>
        <div className="relative">
            <input name='phonenumber' type="text" id="hs-leading-icon" className="py-3 px-4 ps-11 block w-full border-gray-200 border-[1px] shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder={Dot("VzKInd","Enter telephone number")} />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                <svg className="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </div>
        </div>
    </div>
    )
}