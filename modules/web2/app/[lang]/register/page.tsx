
import React from 'react'
import GrailLayoutWithUser from '@/app/__CORE__/containers/GrailLayoutWithUser'
import { AuthInfoProps, CombindSearchProps } from '@/app/[lang]/page'
import CardPanel from '@/app/__CORE__/components/CardPanel';
import { PageProps } from '@/app/__CORE__/types/pages';
import { Dot } from '@/app/__CORE__/utils/TranslationUtils';
import VisiterGuideInfoPanel from '@/app/__CORE__/containers/VisiterSidebar';
import PasswordInput from '@/app/__CORE__/components/PasswordInput'
import UserInput from '@/app/__CORE__/components/UsernameInput'
import PhoneInput from '@/app/__CORE__/components/PhoneInput'
import EmailInput from '@/app/__CORE__/components/EmailInput'
import VerifyCodeInput from '@/app/__CORE__/components/VerifyCodeInput'
import TwTabs from '@/app/__CORE__/components/TwTabs'
import '@/app/__CORE__/script/preline-init'
import { Metadata, ResolvingMetadata } from 'next';
import { getWebsiteName } from '@/app/__CORE__/common/config';
import RegisterPage, { RegisterPageProps } from './RegisterPage'
import { contact_webmaster_email, contact_webmaster_wechat } from '@/app/__CORE__/types/contact';

export default function Page(props: RegisterPageProps) {
    let { searchParams, params } = props;
    let combindSearchProps = props;
    return <GrailLayoutWithUser sidebarViewMode='visiter' extraInSidebar={p => <>
        {
            [<CardPanel className="mt-2" children={
                <div className='p-2 '>
                    <h3 className='font-semibold mb-2'>{Dot("fcGTPc7HP", "Where can I get the invitation code?")}</h3>
                    <div className='text-xs space-y-2'>
                        <div>
                            {Dot("9pBpiYcCy", "To prevent spam and advertisement, we require an invitation code to register your account.")}

                            {Dot("XIzgAAR", "Usually, an available invitation code can be provided from the webmaster or other users. ")}
                            {Dot("dzIC7qPQ", "If you do wish to join us, please try to reach the webmaster on his email {0} or WeChat account {1} to get an invitation code.", contact_webmaster_email, contact_webmaster_wechat)}
                        </div>
                    </div>
                </div>
            }></CardPanel>,
            ...fn_getCardPanelForTelephoneFAQ()]
        }
    </>} combindSearchProps={combindSearchProps} main={(p: AuthInfoProps) => {
        return (
            <div className='space-y-2 flex-1'>
                <RegisterPage pageProps={props}></RegisterPage>
            </div>
        )
    }}></GrailLayoutWithUser>
}

export let fn_getCardPanelForTelephoneFAQ = () => {
    return [
        <CardPanel className="mt-2" children={
            <div className='p-2 '>
                <h3 className='font-semibold mb-2'>{Dot("Pu0pj23rR", "Why Telephone number is required?")}</h3>
                <div className='text-xs space-y-2'>
                    <div>
                        {Dot("o4GdNzX6xS", "Firstly, Owing to the well-known regulation requirement on the Earth, each user is required to provide a valid telephone number to register.")}
                    </div>
                    <div>
                        {Dot("7BtpddC", "Sefcondly, in this community, we do not talk about politics or any other sensitve topics, and of course do not welcome spam or advertisement. That is why we require a valid telephone number for registeration, to prevent any illicit or improper activities.")} {Dot("Jf4iDTZ28", "Besides, for sure, please be assured that we will never sell out your telephone number or make it public.")}
                    </div>
                    <div>
                        {Dot("KAiEq6dcwL5", "Lastly, as a friendly reminder, each user should take the responsibility for their own words and actions.")}
                        {Dot("C7jECCVt9", "Do value your time and never ever forever do anything illegal in this community.")}
                    </div>
                </div>
            </div>
        }>
        </ CardPanel>,
        <CardPanel className="mt-2" children={
            <div className='p-2 '>
                <h3 className='font-semibold mb-2'>{Dot("OPevedpOM", "What if I do not have a telephone number?")}</h3>
                <div className='text-xs space-y-2'>
                    <div>{Dot("Jfr4RzEZG", "Currently, we only accept {0} telephone number to register your account.", "+86")}</div>
                    <div>{Dot("ufSPh0ad", "If it is impossible to register your account via your current telephone number, please reach the webmaster on his email {0} or WeChat account {1}. We can assist you to register your account manually.", contact_webmaster_email, contact_webmaster_wechat)}</div>
                </div>
            </div>
        }></CardPanel>,
    ]
}


export async function generateMetadata(
    Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: getWebsiteName(Dot("dHWho", "Sign Up")),
    };
}