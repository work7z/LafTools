'use client'

import { COMMON_CLZ_ANCHOR_TEXT } from "@/app/__CORE__/common/clz"
import RegularLink from "@/app/__CORE__/components/RegularLink"
import { MoonIcon, Cog8ToothIcon, SunIcon } from '@heroicons/react/24/solid'
import { Dot } from "@/app/__CORE__/utils/ClientTranslationUtils"
import { CombindSearchProps } from "../@/app/[lang]/page"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"

export default (props: { labelMode?: boolean }) => {
    const { theme, setTheme } = useTheme();

    let [mounted, setMount] = useState(false)
    useEffect(() => {
        setMount(true)
    }, [])

    if (!mounted) {
        return <span></span>;
    }

    return <span className='flex space-x-2 items-center justify-start flex-row '>
        {
            theme == "dark" ? (
                <SunIcon className="cursor-pointer h-5 w-5 text-yellow-300" onClick={() => {
                    setTheme('light')
                }} />
            ) : (
                <MoonIcon className=" cursor-pointer h-5 w-5 text-solarized-cyan" onClick={() => {
                    setTheme('dark')
                }} />
            )
        }
        <span onClick={() => {
            setTheme(theme == 'dark' ? 'light' : 'dark')
        }} className={' cursor-pointer text-sm ' + (theme == 'dark' ? ' text-yellow-400 ' : ' text-solarized-cyan ')}>
            {props.labelMode ? theme == 'dark' ? Dot("JAbVG", "Light Theme") : Dot("OnP4s", "Dark Theme") : ''}</span>
    </span>
}