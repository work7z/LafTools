
// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { Dot } from "@/app/__CORE__/utils/TranslationUtils";
import { AuthInfoProps } from "@/app/[lang]/page";
import React from "react";
import { CSS_TEXT_ANCHOR_CSS } from "@/app/[lang]/styles";
import APPINFOJSON from '@/app/[lang]/tools/info'
import LanguageFlowList from "../LanguageFlowList";
import MottoLine from "../MottoLine";

export let FooterContent = () => {
    return <div className="w-full bg-slate-100 dark:bg-slate-800 ">

        <div className=' text-center   w-8/12 space-y-3 mx-auto bp5-text-muted  break-words pt-8 flex flex-col pb-6 ' style={{
            minWidth: '50vw'
        }} >
            <LanguageFlowList></LanguageFlowList>
            <i className="text-xs">
                <MottoLine singleLineMode={true}></MottoLine>
            </i>
            <div className='space-x-3'>
                {
                    [
                        {
                            label: Dot("V6U_f", "Terms of Service"),
                            link: "https://codegen.cc/main/license/main"
                        },
                        {
                            label: Dot("OQWm4", "Report a Bug"),
                            link: "https://github.com/work7z/LafTools/issues"
                        },
                        {
                            // label: Dot("d5LAU", "Licensed under AGPLv3"),
                            label: Dot("4PIqD", "Code Review"),
                            link: "https://github.com/work7z/LafTools/"
                            // link: 'https://en.wikipedia.org/wiki/Affero_General_Public_License'
                        },
                        {
                            label: Dot("zmDWx", "Contact Us"),
                            link: "mailto:work7z@outlook.com"
                        },
                        {
                            label: Dot("13pmE", "Support Us"),
                            // link: "javascript:void(0);",
                            // link: "javascript:void(0);",
                            link: "https://github.com/work7z/LafTools/",
                            onClick: () => {
                                // AlertUtils.win_alert({
                                //     id: "W1z_B",
                                //     msg: <p>
                                //         <h1>{Dot("qHoktx", "Thank You!")}</h1>
                                //         <p>
                                //             {Dot("CidOqAZ", "As the creator of LafTools, I am so touched that you are willing to support us. We have good people on our team who work hard to continuously improve LafTools.")}
                                //         </p>
                                //         <p>
                                //             {Dot("6hsnqWe", "Although LafTools is free and open source, maintaining it still requires a significant amount of time and energy. In particular, we need funds to pay for certain cloud APIs. If you appreciate LafTools, please consider supporting us.")}
                                //         </p>
                                //         <p>
                                //             {Dot("5qPOJL", "To support LafTools, consider either giving a star to our repository on GitHub or upgrading to our professional version through a monthly subscription. We would greatly appreciate your help, and we promise that LafTools will become even better with the funds raised.")}</p>
                                //         <p
                                //             className='bp5-text-muted'
                                //         >{'Ryan Laf'}
                                //             <br />
                                //             {Dot("qWemXE4", "Jan, 1st, 2024")}
                                //         </p>
                                //     </p>
                                // })
                            }
                        }
                    ].map(x => {
                        // onClick = { x.onClick } 
                        return <a href={x.link} className={CSS_TEXT_ANCHOR_CSS} target={x.onClick ? '' : '_blank'}>{x.label}</a>
                    })
                }
            </div>
            <div>
                <b>
                    <a className={CSS_TEXT_ANCHOR_CSS} href="https://laftools.dev" target='_blank'>{''} {

                        Dot("ZbD3F", "{0}, crafted by the LafTools team", "LafTools@" + APPINFOJSON.version + "")
                        // Dot("rK6cx", "{0}, designed and developed by the LafTools team", "LafTools@" + APPINFOJSON.version + "")


                    }</a>
                </b>
            </div>
            {/* <div>
        LafTools <a href="https://laftools.dev">https://laftools.dev</a>
    </div> */}
        </div>
    </div>
}

export default (props) => {
    return <FooterContent />
    // let linksArr: { name: string, href: string }[] = [
    //     { name: Dot("Cz_qjjFw7", "About {0}", "ELB3"), href: "/about" },
    //     { name: Dot("CK5NCw519", "Community Story", "ELB3"), href: "/about" },
    //     { name: Dot("JuZAli3", "User's Guide"), href: "/terms" },
    //     { name: Dot("RjdigcxfV", "Contact us"), href: "mailto:work7z@outlook.com" },
    //     { name: Dot("IWPP6V-tR", "Source Code"), href: "https://github.com/work7z/elb3" },
    // ]
    // return <div className="app-minmax-size mx-auto p-2 py-6 space-y-2 font-sm">
    //     <div className="space-x-4 text-sm  text-slate-500 dark:text-slate-400">
    //         {
    //             linksArr.map((link, i) => {
    //                 return <a target={!link.href.startsWith("/") ? "_blank" : ''} key={i} href={link.href} className=" font-semibold text-slate-500  dark:text-slate-400">{link.name}</a>
    //             })
    //         }
    //         <span className="">{Dot("ky6JphiKk", "{0} Online Users", props.authInfo.systemInfo.userOnlineCount)}</span>
    //         <span>{Dot("gmK3pKyRI", "{0} Peak Online Count", props.authInfo.systemInfo.peakOnlineCount)}</span>
    //         <span>{Dot("nIDKbSXTw", "{0} Users", props.authInfo.systemInfo.userCount)}{''}</span>
    //     </div>
    //     <div className="text-xs text-slate-500 font-serif  dark:text-slate-400">
    //         ELB3.com is derived from <i>English Learning Base</i> group that was founded on August 1st, 2021.  It is technically built with the FOSS project <a href="https://github.com/work7z/elb3" rel='nofollow' target='_blank' className="text-slate-600">ELB3</a> which is licensed under AGPL v3.0.
    //     </div>
    //     <div className="text-xs space-x-4 flex font-semibold text-slate-500 items-center mt-6 ">
    //         <a href="https://beian.miit.gov.cn/" target="_blank" className="hover:underline" rel="nofollow">粤ICP备2022042390号-2</a>
    //         <a className="flex flex-row space-x-1 items-center hover:underline" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502004330" target="_blank">
    //             <img src="/gongan.png" width="20" />
    //             <span>
    //                 粤公网安备 44030502004991号
    //             </span>
    //         </a>
    //         <a className="hover:underline" href="/report">{Dot("aISK9iYc_", "Illegal Information Report")}</a>
    //         <a className="hover:underline" href="/chooseLanguage">{"Select Language"}</a>
    //     </div>
    // </div>
}