
import CardPanel from "@/app/__CORE__/components/CardPanel";
import GrailLayoutWithUser from "@/app/__CORE__/containers/GrailLayoutWithUser";
import { Dot } from "@/app/__CORE__/utils/TranslationUtils";
import { AuthInfoProps, CombindSearchProps } from "@/app/[lang]/page";

export default (props: {
    combindSearchProps: CombindSearchProps
}) => {
    let { combindSearchProps } = props;
    return <GrailLayoutWithUser combindSearchProps={combindSearchProps} main={
        (p: AuthInfoProps) =>
            <div className='space-y-2 flex-1'>
                <CardPanel className='p-8 py-8'>
                    <div className=' '>
                        <div className='text-xl mb-4 font-bold'>
                            {Dot("yOdwRB", "Welcome to ELB3 Community!")}
                        </div>
                        <div className='space-y-2 text-xs'>
                            <div>
                                {Dot("MnVqwid", "Hello, {0}. Nice to meet you! It is our pleasure to invite you to this community. ", p.authInfo.user?.userAcctId)}
                            </div>
                            <div>
                                {Dot("Yc5uMym", "You may wonder what ELB3 stands for, in short, it is short for the non-profit WeChat group {0} which is an interesting platform for English enthusiasts and examinees to learn and appreciate the English!", 'English Learning Base 3')}{Dot("P1zxX2IQ5", "But for this website, it is a derivation of the original group and not limited to English learning, but also for other topics.")}
                            </div>
                            <div>
                                {Dot("5pevqzFXX", "If you also think it is meaningful for you to join us, please continue to update your profile by clicking below button, thanks!")}
                            </div>
                        </div>
                        <div className='space-y-2 mt-2 space-x-2 '>
                            <a href='/settings' type="button" className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                {Dot("W3M4ivK9U", "Update Profile")}
                            </a>
                            <a href='/' type="button" className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-500 text-gray-500 hover:border-gray-800 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-400 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                {Dot("uefFV1", "Later")}
                            </a>
                        </div>
                    </div>
                </CardPanel>
            </div>
    }></GrailLayoutWithUser>
}
