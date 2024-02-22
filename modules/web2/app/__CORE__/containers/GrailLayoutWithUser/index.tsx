'use server'
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import Head from 'next/head'
import { Props } from "next/script";
import { getWebsiteName } from "../../common/config";
import { TopNav } from "../TopNav";
import CenterPart from "../CenterPart";
import CardPanel from '../../components/CardPanel'
import NodeHorizontalBar from "../TabGroupHorizontalBar";
import _, { random } from "lodash";
import UserSideBar, { SidebarViewModeType } from "../UserSideBar";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { usePathname } from 'next/navigation';
import React, { } from "react";
import { AuthInfoProps, CombindSearchProps } from "@/app/[lang]/page";
import { getCookie } from "cookies-next";
import getAuthInfo, { AuthInfo } from "./actions/handleAuthInfo";
import Footer from "../Footer";
import VisiterSidebar from "../VisiterSidebar";
import { fn_getCardPanelForTelephoneFAQ } from "@/app/[lang]/register/page";
import { Dot } from "../../utils/TranslationUtils";
import LanguagePicker from "../LanguagePicker";

export type Jsx_fn_type = (props: AuthInfoProps) => any;

export default async (props: {
    combindSearchProps: CombindSearchProps
} & { sidebarViewMode?: SidebarViewModeType, main: Jsx_fn_type, sidebar?: Jsx_fn_type, extraInSidebar?: Jsx_fn_type }) => {

    let authInfo = await getAuthInfo()
    let jsx_sidebar = <div></div>;
    let extraInSidebar = props.extraInSidebar ? props.extraInSidebar({ authInfo }) : null
    let isNewlyCreatedUser = authInfo.user?.status == 'newly-created'
    let isBannedUser = authInfo.user?.status == 'banned'
    if (props.sidebar) {
        jsx_sidebar = props.sidebar({ authInfo })
    } else if ("visiter" == (props.sidebarViewMode) || !authInfo.signedIn) {
        jsx_sidebar = <VisiterSidebar authInfo={authInfo} extra={extraInSidebar}></VisiterSidebar>
    } else {
        let userExtraInSidbear: any = null;
        if (isBannedUser) {
            userExtraInSidbear = (
                [
                    <CardPanel>
                        <a href='mailto:work7z@outlook.com' className="text-sm p-2 text-center anchor-text flex w-full justify-center py-2">{Dot("VnddCfb-", "You are currently banned for a while")}</a>
                    </CardPanel>,
                    <CardPanel className="mt-2" children={
                        <div className='p-2 '>
                            <h3 className='font-semibold mb-2'>{Dot("lidydVO", "Why I am blocked or limited?")}</h3>
                            <div className='text-xs space-y-2'>
                                <div>{Dot("F-D-AewqL", "Do retrospect with what you have done recently. We cannot endure any behaviour that can be considered as harrasment, ADs or personal abuse, etc...")}</div>
                                <div>{Dot("lEDpJMRfG", "If you are confused, please feel free to let us know by sending an email to us.")}</div>
                            </div>
                        </div>
                    } />
                ]
            )
        } else if (isNewlyCreatedUser) {
            userExtraInSidbear = (
                [
                    <CardPanel>
                        <a href='/activation' className="text-sm p-2 text-center anchor-text flex w-full justify-center py-2">{Dot("VndKeCfb-", "Verify Telephone to Activate Account")}</a>
                    </CardPanel>,
                    ...fn_getCardPanelForTelephoneFAQ(),
                ]
            )
        } else {
            userExtraInSidbear = [
                <CardPanel>
                    <a href='/create' className="text-sm p-2 text-center anchor-text flex w-full justify-center py-2">
                        {Dot("Gy45ssBPS", "Create New Topic")}
                    </a>
                </CardPanel>,
            ]
        }
        jsx_sidebar = <UserSideBar authInfo={authInfo} extra={extraInSidebar || userExtraInSidbear} {...props.combindSearchProps}></UserSideBar>
    }
    let jsx_center = <div className=" flex flex-row space-x-4 ">
        {props.main({ authInfo })}
        <div
            style={{
                width: '290px'
            }}
            className="space-y-2"
        >
            {jsx_sidebar}
        </div>
    </div >
    return (<main className="" ><div>
        <TopNav authInfo={authInfo}></TopNav>
        <CenterPart children={jsx_center as any} />
        <Footer authInfo={authInfo}></Footer>
    </div>
    </main>);
}

