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
export type LoginPageProps = PageProps<{}, { type: string }>

// write LoginPage for including phone number and password
export default function LoginPage(props: { loginPageProps: LoginPageProps }) {
    let [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, [])
    if (!mounted) {
        return <div>loading...</div>
    }

    let { loginPageProps } = props;
    return <div className=''>
        <CardPanel className='p-4 py-8'>
            <div className='mx-20 '>
                <div className='text-2xl mb-4 font-bold'>
                    {Dot("yOwRB", "Sign In")}
                </div>

                <div className='space-y-2 mt-4 max-w-md'>
                    <div className='mb-2'>
                        <TwTabs paramName='type' activeId={loginPageProps.searchParams.type} tabs={
                            [
                                {
                                    label: Dot("kO7kX", "Username"),
                                    value: 'username'
                                },
                                // {
                                //     label:Dot("nVqME","Phone Number"),
                                //     value: 'phonenumber'
                                // },
                                {
                                    label: Dot("APPR7", "Email Address"),
                                    value: 'email'
                                },
                            ]
                        }></TwTabs>
                    </div>
                    {
                        loginPageProps.searchParams.type == 'username' ? <UserInput name='user'></UserInput> :
                            <EmailInput name='email' />
                    }
                    <PasswordInput name='password'></PasswordInput>
                    <div className=' text-right'>
                        <a className='anchor-text text-sm' href="/reset-password">
                            {Dot("dKfY3I", "Forgot password?")}
                        </a>
                    </div>
                    <VerifyCodeInput codeImgBase64={''}></VerifyCodeInput>
                    <div className='clearfix  clear-none'></div>
                    <div className='pt-6'>
                        <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent transition-all bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                            {Dot("Sa-gP", "Sign In")}
                        </button>
                    </div>
                    <div className=' text-right text-sm space-x-2'>
                        <span>                        {Dot("newtoelb", "New to {0} Community?", 'ELB3')}</span>
                        <a className='anchor-text text-sm' href="/reset-password">
                            {Dot("9gzkh", "Create New Account", "")}
                        </a>
                    </div>


                </div>
            </div>
        </CardPanel>
    </div>
}
