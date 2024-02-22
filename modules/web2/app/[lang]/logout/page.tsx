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
import { LoginPageProps } from '../login/LoginPage';
import LanguagePicker from '@/app/__CORE__/containers/LanguagePicker';
import LogoutPage from './LogoutPage';
import { deleteCookie, getCookie, getCookies } from 'cookies-next';


export default function Page(props: LoginPageProps) {
    let { searchParams, params } = props;
    let combindSearchProps = props;
    return <GrailLayoutWithUser combindSearchProps={combindSearchProps} main={(p) => <LogoutPage authInfo={p.authInfo} />}></GrailLayoutWithUser>
}


export async function generateMetadata(
    Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: getWebsiteName(Dot("p1Jyl4uMv", "Logout Your Account")),
    };
}