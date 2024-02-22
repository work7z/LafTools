import CardPanel from "../../components/CardPanel"
import { Dot } from "../../utils/TranslationUtils"
import MoonSunControl from "../UserSideBar/MoonSunControl"
import LanguagePicker from '../LanguagePicker'
import moment from 'moment'
import { AuthInfoProps } from "@/app/[lang]/page"

export let WeekDay = () => {
    let week = moment().week()
    let weekLabel = [
        "Terrific Tuesday",
        "Wonderful Wednesday",
        "Thrilling Thursday",
        "Fantastic Friday",
        "Satisfying Saturday",
        "Happy Sunday",
        "Marvelous Monday",
    ]
    return <a className="anchor-text font-sans text-sm text-slate-500 dark:text-slate-300" href='/en/chooseLanguage'>Select Language</a>
    // return <div className="font-sans text-sm text-slate-500 dark:text-slate-300">{weekLabel[week - 1]}</div>
}

export let WeekDayCardPanel = () => {
    return (

        <CardPanel className="mt-2" children={<div className='p-2 flex flex-row justify-between items-center'>
            <MoonSunControl labelMode></MoonSunControl>
            <WeekDay></WeekDay>
        </div>}>
        </CardPanel>
    )
}

export type SidebarProps = AuthInfoProps & { extra?: JSX.Element };

export default (props: SidebarProps) => {
    return <div className="space-y-2 ">
        <CardPanel children={<div className='p-2'>
            <h1 className='text-lg font-semibold'>{Dot("Wpdsp3g5U", "Welcome to {0} Community!", "ELB3")}</h1>
            <div className='text-sm'>
                <div dangerouslySetInnerHTML={{
                    __html: Dot("IcvP2d-QY", "Please {0} or {1} to join the discussion", `<a href='/login' class='anchor-text'>${Dot("CQ44pYZYj", "login")}</a>`, `<a class='anchor-text' href='/register' >${Dot("DYaOL4Yp7", "register")}</a>`)
                }}>
                </div>
            </div>
        </div>}>
        </CardPanel>

        <WeekDayCardPanel></WeekDayCardPanel>

        {props.extra}

        {/* <LanguagePicker authInfo={props.authInfo}></LanguagePicker> */}

    </div>
}