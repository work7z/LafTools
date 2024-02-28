import { AuthInfoProps, CombindSearchProps } from "./[lang]/page"
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import Head from 'next/head'
import { Props } from "next/script";
import { Dot } from "./__CORE__/utils/TranslationUtils";
import { getWebsiteName } from "./__CORE__/common/config";
import { TopNav } from "./__CORE__/containers/TopNav";
import CenterPart from "./__CORE__/containers/CenterPart";
import CardPanel from './__CORE__/components/CardPanel'
import NodeHorizontalBar from "./__CORE__/containers/TabGroupHorizontalBar";
import _, { random } from "lodash";
import { useParams, useSearchParams } from "next/navigation";
import { usePathname } from 'next/navigation';
import React, { } from "react";
import GrailLayoutWithUser from "./__CORE__/containers/GrailLayoutWithUser";

x
export default (props: {
    combindSearchProps: CombindSearchProps
}) => {
    let { combindSearchProps } = props;
    let { searchParams } = combindSearchProps;

    let testNodes = ['生活', '闲聊', '历程', 'PETS3', '纯英语', '语法交流', '单词PK']
    let randomGetOneFromArr = (arr: string[]) => {
        return arr[Math.floor(Math.random() * arr.length)]
    }
    let clzForUserLabel = "hover:underline  font-medium dark:text-slate-400"

    let activeTabs = searchParams.tabs
    return <GrailLayoutWithUser combindSearchProps={combindSearchProps} main={(p: AuthInfoProps) => {
        return <CardPanel className={''} style={{
            flex: '1'
        }}>
            <NodeHorizontalBar activeId={activeTabs}></NodeHorizontalBar>
            <div className="px-4 py-3 flex justify-between items-center bg-gray-100 dark:bg-solarized-base03 dark:text-white  min-h-8 border-slate-200  dark:border-solarized-base02Light1  shadow-inner border-t border-b" >
                <div className="space-x-4">
                    {
                        testNodes.map(x => {
                            return <a href={'/go/' + x} className="hover:underline text-slate-700 dark:text-slate-400">{x}</a>
                        })
                    }
                </div>
            </div>
            <div>
                {
                    /** write a topic list, with example value */
                    // _.fill(Array(10), 1).map((x, d) => {
                    _.fill(Array(0), 1).map((x, d) => {
                        let tLink = "/t/" + d
                        return <div className=" p-3 py-3 flex border-slate-100 border-b dark:border-solarized-base03 ">
                            <div className={" rounded flex text-2xl mr-1  font-semibold text-slate-700 items-center justify-center w-14 h-14  "}>
                                <img src={"/avatar/" + _.random(1, 200) + ".png"} className="w-full h-full rounded"></img>
                            </div>
                            <div className="ml-2 flex-shrink " style={{
                                flex: '1'
                            }}>
                                <div>
                                    <a href={tLink} className="text-slate-600 hover:underline dark:text-slate-300 text-md ">{
                                        randomGetOneFromArr([
                                            'A virtual Language Exchange',
                                            '学英语，最难的事情算是背单词',
                                            '中国人英语发音最常见的问题是这三个',
                                            '求助，只是想搞懂triple这个词咋来的',
                                            '请教专家们，在学no和not的区别时碰到的例句: I have no money. 和 I have not money. 有什么区别吗？',
                                            '大英赛23年的智力题, every body try try',
                                            'PETS3明天就要报考了 有一些紧张',
                                            '我现在词汇量有3500，这样考P3够吗'
                                        ])
                                    }</a>
                                </div>
                                <div className="space-x-3 text-sm mt-2  text-gray-400 flex items-center">
                                    <a href="/go/test" className="bg-slate-100  dark:bg-solarized-base02 dark:text-slate-400 hover:dark:bg-slate-300    hover:dark:text-slate-700 hover:bg-slate-200 rounded-sm transition-all duration-100 px-1 py-1 text-xs">{randomGetOneFromArr(testNodes)}</a>
                                    <a href="/go" className={clzForUserLabel}>{randomGetOneFromArr(["Min-广州-PETS3", "布布-上海-PETS", "本老师-广州-中考", "大鱼-上海-PETS3", "VIVI-成都-P3"])}</a>
                                    <span className="text-gray-300 dark:text-slate-500">{randomGetOneFromArr(["1小时30分钟前", "3小时50分钟前", "2分钟前", "刚刚"])}</span>
                                    <span className="space-x-1">
                                        <span className="text-gray-300 dark:text-slate-500 ">
                                            {Dot("lastreplyby", "Last reply by")}
                                        </span>
                                        <span className={clzForUserLabel}>
                                            <a href="/go" className="hover:underline  font-medium">{randomGetOneFromArr(["Min", "布布", "惠惠子", "Longings", "大鱼", "Ben老师"])}</a>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className='p-2 mt-2'>
                                <a href={tLink} target="_blank" className=" nav-size-icon flex justify-center items-center rounded-lg  text-white bg-solarized-violetLight hover:bg-solarized-violet dark:hover:bg-solarized-cyan dark:bg-solarized-cyanDark dark:text-slate-50 mt-1 font-mono text-bold  px-2 text-md py-0" style={{
                                    fontWeight: 'bold'
                                }}>3</a>
                            </div>
                        </div>
                    })
                }
            </div>
        </CardPanel>
    }} />
}

