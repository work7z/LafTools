import { fmtURL_Server } from '../__CORE__/utils/routeUtils'
import { Dot, getXHostname } from "../__CORE__/utils/TranslationUtils";
import { LabelHrefType } from './navigator'

export let fmt_Category = (x: string) => {
    return fmtURL_Server(`/${x}`)
}
export let fmt_ToolSubPage = (x: string) => {
    return fmtURL_Server(fmt_Category('tools') + '/' + x)
}
export let fn_leftNav = (): LabelHrefType[] => {
    let leftNav: LabelHrefType[] = [
        {
            label: Dot("G2dvTUljF", "Tools"),
            href: fmt_Category('/tools')
        },
        {
            label: Dot("n28g4di0L", "Manuals"),
            href: fmt_Category('/manuals')
        },
        {
            label: Dot("AvsWiJHLZ", "Resources"),
            href: fmt_Category('/resources'),
        },
        {
            label: Dot("ymyfghy1r", "Notes"),
            href: fmt_Category('/notes')
        },
        {
            label: Dot("bWQunyU10", "AI Laboratory"),
            href: fmt_Category('/ai-lab')
        },
    ]

    return leftNav
}
// TODO: update the /v2 to actual path
export let fn_rightNav = (): LabelHrefType[] => {
    let rightNav: LabelHrefType[] = [
        // {
        //     label: <LightDarkButton />,
        //     href: 'javascript:void(0);'
        // },
        {
            label: Dot("str.login", "Login"),
            href: '/v2/zh-hans/nav/form/sign-in'
        },
        {
            label: Dot("str.register", "Register"),
            href: '/v2/zh-hans/nav/form/sign-up'
        },
        {
            label: Dot("str.usercentre", "User Centre"),
            href: '/v2/zh-hans/nav/overview'
        },
    ]
    return rightNav
}

export let fn_leftCategoryArr = (): LabelHrefType[] => {
    let leftCategoryArr: LabelHrefType[] = [
        {
            label: Dot("str.formatter", "Formatters"),
            href: '/formatters'
        },
        {
            label: Dot("str.codecs", "Codecs"),
            href: '/codecs'
        },
        {
            label: Dot("mhWk4dtid", "Encoding"),
            href: '/encoding'
        },
        {
            label: Dot("str.converters", "Converters"),
            href: '/converters'
        },
        {
            label: Dot("str.parsers", "Parsers"),
            href: '/parsers'
        },
        {
            label: Dot("IEFy5k39X", "Generators"),
            href: '/generator'
        },
    ]
    return leftCategoryArr;
}
export let fn_rightCategoryArr = () => {
    let rightCategoryArr: LabelHrefType[] = [
        {
            label: Dot("str.remarks", "Favorites"),
            href: '/favorites',
        },
        {
            label: Dot("str.mostused", "Frequently-Used"),
            href: '/most-used',
        }
    ]
    return rightCategoryArr
}