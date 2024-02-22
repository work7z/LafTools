import { getPureWebsiteName } from "@/app/__CORE__/common/config"
import { Dot } from "@/app/__CORE__/utils/TranslationUtils"

export default (props: { children: JSX.Element }) => {
    return <div style={{
        minHeight: 'calc(100vh - 30px - 120px)'
    }} className="  dark:bg-solarized-base02 bg-slate-100 w-full shadow-inner dark:shadow-solarized-base00 dark:shadow-none  shadow-slate-200  pb-12">
        <div className="app-minmax-size mx-auto p-4">
            {props.children}
        </div>
    </div>
}