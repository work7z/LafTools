import Link from "next/link"
import { LabelHrefType } from "./navigator"

export let NavItem = (props: {
    nav: LabelHrefType[]
}) => {
    let { nav } = props
    let leftNav = nav
    return <div className={' flex flex-row space-x-4 font-xs '}>
        {
            leftNav.map(x => {
                return <Link href={x.href} className="text-xs">{x.label}</Link>
            })
        }
    </div>
}