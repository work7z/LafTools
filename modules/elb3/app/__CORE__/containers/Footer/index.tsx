import { Dot } from "@/app/__CORE__/utils/TranslationUtils";
import { AuthInfoProps } from "@/app/page";
import React from "react";

export default (props: AuthInfoProps) => {
    let linksArr: { name: string, href: string }[] = [
        { name: Dot("Cz_qjjFw7", "About {0}", "ELB3"), href: "/about" },
        { name: Dot("CK5NCw519", "Community Story", "ELB3"), href: "/about" },
        { name: Dot("JuZAli3", "User's Guide"), href: "/terms" },
        { name: Dot("RjdigcxfV", "Contact us"), href: "mailto:work7z@outlook.com" },
        { name: Dot("IWPP6V-tR", "Source Code"), href: "https://github.com/work7z/elb3" },
    ]
    return <div className="app-minmax-size mx-auto p-2 py-6 space-y-2 font-sm">
        <div className="space-x-4 text-sm  text-slate-500 dark:text-slate-400">
            {
                linksArr.map((link, i) => {
                    return <a target={!link.href.startsWith("/") ? "_blank" : ''} key={i} href={link.href} className=" font-semibold text-slate-500  dark:text-slate-400">{link.name}</a>
                })
            }
            <span className="">{Dot("ky6JphiKk", "{0} Online Users", props.authInfo.systemInfo.userOnlineCount)}</span>
            <span>{Dot("gmK3pKyRI", "{0} Peak Online Count", props.authInfo.systemInfo.peakOnlineCount)}</span>
            <span>{Dot("nIDKbSXTw", "{0} Users", props.authInfo.systemInfo.userCount)}{''}</span>
        </div>
        <div className="text-xs text-slate-500 font-serif  dark:text-slate-400">
            ELB3.com is derived from <i>English Learning Base</i> group that was founded on August 1st, 2021.  It is technically built with the FOSS project <a href="https://github.com/work7z/elb3" rel='nofollow' target='_blank' className="text-slate-600">ELB3</a> which is licensed under AGPL v3.0.
        </div>
        <div className="text-xs space-x-4 flex font-semibold text-slate-500 items-center mt-6 ">
            <a href="https://beian.miit.gov.cn/" target="_blank" className="hover:underline" rel="nofollow">粤ICP备2022042390号-2</a>
            <a className="flex flex-row space-x-1 items-center hover:underline" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502004330" target="_blank">
                <img src="/gongan.png" width="20" />
                <span>
                    粤公网安备 44030502004991号
                </span>
            </a>
            <a className="hover:underline" href="/report">{Dot("aISK9iYc_", "Illegal Information Report")}</a>
        </div>
    </div>
}