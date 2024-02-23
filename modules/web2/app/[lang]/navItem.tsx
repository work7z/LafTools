import Link from "next/link"
import { LabelHrefType } from "./navigator"

export let NavItem = (props: {
    nav: LabelHrefType[],
    extraLeft?: any
}) => {
    let { nav } = props
    let leftNav = nav
    return <div className={' flex flex-row items-center  space-x-4 font-xs '}>
        {props.extraLeft}
        {
            leftNav.map(x => {
                return <Link href={x.href} className={
                    "text-xs text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 duration-100 "
                }>{x.label}</Link>
            })
        }
    </div>
}