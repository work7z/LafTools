
import { Inter } from "next/font/google";
import TranslationUtils, { getWebsiteLocale as getWebsiteLocale } from "../../utils/TranslationUtils";
import { TopNav } from "../TopNav";
import CenterPart from "../CenterPart";
import Footer from "../Footer";
import { ThemeProvider } from "../../../theme-provider";


const inter = Inter({ subsets: ["latin"] });
export default function RootLayout(props: {
    children,
}) {
    let { children } = props;
    return (
        <html lang={getWebsiteLocale()}>
            <body className={' min-h-screen dark:bg-solarized-base03 dark:text-slate-300    ' + inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <div className="w-full h-full">
                        {children}
                    </div>
                </ThemeProvider>
                {/* <span id='i18nele' className="hidden" rel='nofollow'>                    {JSON.stringify(TranslationUtils.LangMap)}                </span> */}
            </body>
        </html>
    );
}
