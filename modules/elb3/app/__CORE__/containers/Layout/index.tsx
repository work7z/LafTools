
import { Inter } from "next/font/google";
import { getWebsiteLocale as getWebsiteLocale } from "../../utils/TranslationUtils";
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
            </body>
        </html>
    );
}
