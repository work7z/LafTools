'use client'

import React from 'react'
import GrailLayoutWithUser from '@/app/__CORE__/containers/GrailLayoutWithUser'
import { CombindSearchProps } from '@/app/page'
import CardPanel from '@/app/__CORE__/components/CardPanel';
import { PageProps } from '../__CORE__/types/pages';
import { Dot } from '../__CORE__/utils/TranslationUtils';
import VisiterGuideInfoPanel from '../__CORE__/containers/VisiterGuideInfoPanel';
import PasswordInput from '../__CORE__/components/PasswordInput'
import UserInput from '../__CORE__/components/UsernameInput'
import PhoneInput from '../__CORE__/components/PhoneInput'
import EmailInput from '../__CORE__/components/EmailInput'
import VerifyCodeInput from '../__CORE__/components/VerifyCodeInput'
import TwTabs from '../__CORE__/components/TwTabs'
import '../__CORE__/script/preline-init'
import { Metadata, ResolvingMetadata } from 'next';
import { getWebsiteName } from '../__CORE__/common/config';
import create from './createAction'
import { useFormState } from 'react-dom'
import LoadingWrapper from '../__CORE__/containers/LoadingWrapper';
import AlertErrorPanel from '../__CORE__/containers/AlertErrorPanel';

export default function RegisterPage(props: { pageProps: RegisterPageProps }) {
    let { pageProps } = props;
    let [errMsg, setErrMsg] = React.useState<string[]>([])
    return <LoadingWrapper><form className='' method="POST" onSubmit={async e => {
        e.preventDefault();
        setErrMsg([])
        // get form data 
        let formData = new FormData(e.target as HTMLFormElement);
        let v = await create({
            username: formData.get("username")?.toString(),
            password: formData.get("password")?.toString(),
            email: formData.get("email")?.toString(),
            confirmPassword: formData.get("confirmPassword")?.toString(),
            vcode: formData.get("vcode")?.toString(),
        })
        if (v.error) {
            setErrMsg([v.error || ''])
            window.scrollTo(0, 0)
            return;
        };
        location.href = '/'
    }}  >
        <CardPanel className='p-4 py-8'>
            <div className='mx-20 '>
                <div className='text-2xl mb-4 font-bold'>
                    {Dot("yOwdRB", "Create an Account")}
                </div>
                <AlertErrorPanel errorMsg={errMsg}></AlertErrorPanel>

                <div className='space-y-2 mt-4 max-w-md'>
                    <div className='mb-2'>
                    </div>
                    <UserInput name='user' />
                    <EmailInput name='email' />
                    <PasswordInput name='password' strongMode></PasswordInput>
                    <PasswordInput name='confirmPassword' label={Dot("TXh_K", "Confirm Password")} ph={Dot("sfooX", "Confirm your password")}></PasswordInput>
                    <VerifyCodeInput codeImgBase64={''}></VerifyCodeInput>
                    <div className='clearfix  clear-none'></div>
                    <div className='pt-6'>
                        <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-solarized-base02Light5 text-white hover:bg-solarized-base02Light3 transition-all disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            {Dot("register", "Register Now")}
                        </button>
                    </div>
                    <div className=' text-right text-sm space-x-2'>
                        <span>                        {Dot("3Lfbe", "Already Have an Account?")}</span>
                        <a className='anchor-text text-sm' href="/login">
                            {Dot("wOpCO", "Click to Login", "")}
                        </a>
                    </div>


                </div>
            </div>
        </CardPanel>
    </form>
    </LoadingWrapper>
}

export type RegisterPageProps = PageProps<{
    username?: string
}, { type: string, }>