import { COMMON_CLZ_ANCHOR_TEXT } from "@/app/__CORE__/common/clz"
import RegularLink from "@/app/__CORE__/components/RegularLink"
import { MoonIcon, Cog8ToothIcon, SunIcon } from '@heroicons/react/24/solid'

import { Dot } from "@/app/__CORE__/utils/TranslationUtils"
import MoonSunControl from "./MoonSunControl"
import _ from 'lodash'
import VisiterSidebar, { SidebarProps } from "../VisiterSidebar"
import { fn_get_user_avatar } from "@/app/[lang]/register/user-types"
import CardPanel from "../../components/CardPanel"
import { fn_getCardPanelForTelephoneFAQ } from "@/app/[lang]/register/page"
import LanguagePicker from "../LanguagePicker"


let EachInfoCell = (props: { href?: string, className?: string, name: string, content: any }) => {
    return <a href={props.href || '/'} className={"w-full h-full   space-x-1 text-sm text-gray-400 dark:text-inherit flex flex-col text-center items-center justify-center hover:bg-zinc-50 dark:hover:bg-solarized-base02 transition-all duration-300 pt-2 pb-2 " + ' ' + props.className}>
        <div className="text-base mb-1 text-gray-500 dark:text-inherit font-medium ">{props.name}</div>
        <div className="font-light">{props.content}</div>
    </a>
}

export type SidebarViewModeType = "visiter" | "default"
export default (props: SidebarProps) => {
    let notificationCtn = 0;
    let borderStyleClz = "  border-gray-200 dark:border-solarized-base02Light1  "
    let eachInfoCellClz = borderStyleClz + " border-r-[1px]"
    let joinedDate = props.authInfo.user?.createdAt
    let diffDays = Math.max(joinedDate ? Math.floor((new Date().getTime() - new Date(joinedDate).getTime()) / (1000 * 60 * 60 * 24)) : 0, 0)
    let innerUserJSX = (
        <CardPanel>
            <div className="p-2">
                <div className="flex ">
                    <img src={fn_get_user_avatar(props)} className="w-12 h-12 rounded bg-zinc-100  text-xl flex justify-center items-center text-gray font-bold ">
                    </img>
                    <div className="flex-shrink flex-1 ml-2">
                        <div>
                            <a href="/" className="text-gray-800 dark:text-slate-300 hover:underline font-bold">{props.authInfo.user?.userAcctId}</a>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-slate-300 mt-[-1px]">{diffDays < 1 ? Dot("6h14B_t4I", "Joined Today") : Dot("hxCMxpW6Sq", "Joined {0} days ago", diffDays)}</div>
                    </div>
                </div>
                <hr className={"mt-2 " + borderStyleClz}></hr>
                <div className="flex flex-row   justify-around">
                    <EachInfoCell className={eachInfoCellClz} name={Dot("BqWGnXEzV", "City")} content={
                        props.authInfo?.user?.cityId || Dot("m2LEjrKDS", '未知')
                    } />
                    <EachInfoCell className={eachInfoCellClz} name={Dot("jdbef_PBl", "Goal")} content={
                        props.authInfo?.user?.goal || Dot("tip_JkgcP", '未知')
                    } />
                    <EachInfoCell name={Dot("Y0drdCSiu", "Topics")} content={
                        props.authInfo?.user?.topicCount || 0
                    } />
                </div>
                <hr className={" mb-2  " + borderStyleClz}></hr>
                <div className='flex flex-row  justify-between items-center '>
                    <div className="flex">
                        <img src={notificationCtn != 0 ? "/controls/email.png" : "/controls/city.png"} className={"w-5 mr-2 " + (
                            notificationCtn != 0 ? "" : " opacity-60 "
                        )}></img>
                        <RegularLink href={'/notifications'} children={<span className={(notificationCtn != 0 ? ' text-yellow-500 dark:text-yellow-400  ' : '') + COMMON_CLZ_ANCHOR_TEXT}>{Dot("2RbUh6TyJ", "{0} Unread Notifications", notificationCtn)}</span>}>
                        </RegularLink>
                    </div>
                    <div className="flex space-x-1">
                        <MoonSunControl></MoonSunControl>
                        <RegularLink href="/settings" children={(
                            <Cog8ToothIcon className="h-5 w-5 text-zinc-400 dark:text-zinc-400 "></Cog8ToothIcon>
                        )}></RegularLink>
                    </div>
                </div>
            </div >
        </CardPanel>
    )
    return <div className="space-y-2">
        {innerUserJSX}
        {props.extra}
        {/* <LanguagePicker authInfo={props.authInfo} />, */}
    </div>
}

