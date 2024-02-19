'use client'

import React, { useState } from "react";
import CardPanel from "@/app/__CORE__/components/CardPanel";
import PhoneInput from "@/app/__CORE__/components/PhoneInput";
import GrailLayoutWithUser from "@/app/__CORE__/containers/GrailLayoutWithUser";
import LoadingWrapper from "@/app/__CORE__/containers/LoadingWrapper";
import { Dot } from "@/app/__CORE__/utils/ClientTranslationUtils";
import { AuthInfoProps, CombindSearchProps } from "@/app/[lang]/page";
import AlertErrorPanel from "@/app/__CORE__/containers/AlertErrorPanel";
import VerifyCodeInput from "@/app/__CORE__/components/VerifyCodeInput";
import GeneralInput from "@/app/__CORE__/components/GeneralInput";
import { sendSMSCodeWithVerificationCode, verifySMSCode } from "../register/action/userAction";

export default (p: AuthInfoProps) => {
    let [errMsg, setErrMsg] = React.useState<string[]>([])
    let [vcodeFactor, onVCodeFactor] = useState(0)
    let dftPhoneNumber = p.authInfo.user?.phoneNumber || ''
    let [phoneNumber, onPhoneNumber] = useState<string>(dftPhoneNumber)
    let [final_phoneNumber, onFinalPhoneNumber] = useState<string>(dftPhoneNumber)
    let [working, onWorking] = useState(false)
    let [resendMode, setResendMode] = useState(false)

    // activation page
    let jsx_phoneInput = <PhoneInput onChange={e => {
        onPhoneNumber(e)
    }} name={"phoneNumber"} defaultValue={phoneNumber}></PhoneInput>

    let inner = (
        <form className="space-y-2" onSubmit={async e => {
            e.preventDefault();
            let formData = new FormData(e.target as HTMLFormElement);
            setErrMsg([])
            try {
                let phoneNumber = final_phoneNumber // formData.get("phoneNumber")?.toString() || ''
                let msgCode = formData.get("msgCode")?.toString() || '';
                onWorking(true)
                let e = await verifySMSCode({
                    phoneNumber,
                    msgCode,
                    type: 'activate-account'
                })
                if (e && e.error) {
                    setErrMsg([e.error])
                } else {
                    setResendMode(false)
                    location.href = '/welcome'
                }
            } catch (e: any) {
                console.log('err', e)
                setErrMsg([e.message])
            } finally {
                onWorking(false)
            }
        }}>
            <AlertErrorPanel noVCode errorMsg={errMsg}></AlertErrorPanel>
            <PhoneInput disabled={true} onChange={e => {
                onPhoneNumber(e)
            }} name={"phoneNumber"} defaultValue={phoneNumber}></PhoneInput>

            <GeneralInput defaultValue={''} type="number" max={6} label={Dot("9YPgsPid2M", "SMS Code")} ph={Dot("Md1JbKBRx", "Enter six-digits SMS Code")} fn_svgJSX={
                (clz: string) =>
                (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={clz}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                )
            } name='msgCode' ></GeneralInput>
            <div className='space-y-2 mt-2 space-x-2 '>
                <button disabled={working} type="submit" className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-solarized-blue text-white hover:bg-solarized-blueLight   disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    {Dot("PbNcddi", "Activate Account")}
                </button>
                <button type="button" onClick={() => {
                    setResendMode(true)
                }} className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-500 text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-400 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    {Dot("uedfFV1", "Resend Code")}
                </button>
                <button type="button" onClick={() => {
                    setResendMode(true)
                }} className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-500 text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-400 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                    {Dot("uedsV1", "Change PhoneNumber")}
                </button>
            </div>
        </form>
    )
    // resend mode
    if (resendMode) {
        inner = <div>
            <form className="space-y-2" onSubmit={async e => {
                e.preventDefault();
                let formData = new FormData(e.target as HTMLFormElement);
                setErrMsg([])
                try {
                    let phoneNumber = formData.get("phoneNumber")?.toString() || ''
                    let vcode = formData.get("vcode")?.toString() || '';
                    onWorking(true)
                    let e = await sendSMSCodeWithVerificationCode({
                        phoneNumber,
                        vcode
                    })
                    if (e && e.error) {
                        setErrMsg([e.error])
                        onVCodeFactor(Date.now())
                    } else {
                        setResendMode(false)
                        onFinalPhoneNumber(phoneNumber)
                    }
                } catch (e: any) {
                    console.log('err', e)
                    setErrMsg([e.message])
                } finally {
                    onWorking(false)
                }
            }}>
                <AlertErrorPanel errorMsg={errMsg}></AlertErrorPanel>
                {jsx_phoneInput}
                <VerifyCodeInput vcodeFactor={vcodeFactor}></VerifyCodeInput>
                <div className='space-y-2 mt-2 space-x-2 '>
                    <button disabled={working} type="submit" className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-solarized-greenLight text-white hover:bg-solarized-green   disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        {Dot("JpbHj8RRw", "Resend Code")}
                    </button>
                    <button type="button" onClick={() => {
                        setResendMode(false)
                    }} className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-500 text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-400 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        {Dot("ffblLVX-F", "Cancel")}
                    </button>
                </div>

            </form>
        </div>
    }
    return <div className='space-y-2 flex-1'><LoadingWrapper>
        <CardPanel className='p-8 py-8'>
            <div className=' '>
                <div className='text-xl mb-4 font-bold'>
                    {Dot("yMOBkjIbRtB", "Last step to ELB3 Community")}
                </div>
                <div className='space-y-2 text-xs'>
                    <div>
                        {Dot("5ANr-yPVdi", "Hello, {0}. We need to verify your telephone number to activate your account, it will not take too long.", p.authInfo.user?.userAcctId)}
                        {resendMode ?
                            Dot("3PwVdYKz7", "To resend a SMS code to your phone {0}, please input below verification code firstly. Note that you can also adjust your telephone number here, and please feel free to let us know if any concern, thanks!", phoneNumber)
                            :
                            Dot("9gWsZdEN", "We have sent an activation code to your phone {0}, please check it and input it as below. If you did not receive any message on your phone, you can click the resend button to get a new one.", phoneNumber)}
                    </div>

                </div>
                <div className='space-y-2 space-x-2 max-w-md mt-8 '>
                    {inner}
                </div>
            </div>
        </CardPanel> </LoadingWrapper>
    </div>
}