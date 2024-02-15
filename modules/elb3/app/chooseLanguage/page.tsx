
import React from 'react'
import GrailLayoutWithUser from '@/app/__CORE__/containers/GrailLayoutWithUser'
import { AuthInfoProps, CombindSearchProps } from '@/app/page'
import CardPanel from '@/app/__CORE__/components/CardPanel';
import { PageProps } from '../__CORE__/types/pages';
import { Dot } from '../__CORE__/utils/TranslationUtils';
import VisiterGuideInfoPanel from '../__CORE__/containers/VisiterSidebar';
import PasswordInput from '../__CORE__/components/PasswordInput'
import UserInput from '../__CORE__/components/UsernameInput'
import PhoneInput from '../__CORE__/components/PhoneInput'
import EmailInput from '../__CORE__/components/EmailInput'
import VerifyCodeInput from '../__CORE__/components/VerifyCodeInput'
import TwTabs from '../__CORE__/components/TwTabs'
import '../__CORE__/script/preline-init'
import { Metadata, ResolvingMetadata } from 'next';
import { getWebsiteName } from '../__CORE__/common/config';
import { LoginPageProps } from '../login/LoginPage';
import LanguagePicker from '../__CORE__/containers/LanguagePicker';

export default function Page(props: LoginPageProps) {
    let { searchParams, params } = props;
    let combindSearchProps = props;
    return <GrailLayoutWithUser combindSearchProps={combindSearchProps} main={(p: AuthInfoProps) => (
        <div className='space-y-2 flex-1'>
            <CardPanel className='p-2'><div>
                <LanguagePicker authInfo={p.authInfo} ></LanguagePicker></div></CardPanel>
        </div>
    )}></GrailLayoutWithUser>
}


export async function generateMetadata(
    Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: getWebsiteName(Dot("tiv188Gz5", "Select Website Language")),
    };
}