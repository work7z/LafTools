
import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { getXSearchParams } from "../../../../__CORE__/utils/TranslationUtils";

export default function App() {
    let tabs = [
        {
            id: "JSON格式化",
            label: "JSON格式化",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: "music",
            label: "MD5加密",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            id: "videos",
            label: "SHA1加密",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: "images",
            label: "SHA256加密",
            content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: "documents",
            label: "SHA512加密",
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        }
    ];

    // get parameter in next.js
    let sp = getXSearchParams()
    return (
        <div className="flex w-full  pl-2 flex-col bg-white dark:bg-black ">
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-2 justify-center" aria-label="Tabs" role="tablist">
                    {
                        tabs.map(x => {
                            return <Link key={x.id} href={'/?id=' + x.id}>
                                <button type="button" className={
                                    ((sp["id"] || tabs[0]?.id) == x.id ? "active " : ' ') +
                                    'hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 '
                                    // " hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-blue-600 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-x-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-lg hover:text-gray-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                } id="card-type-tab-item-2" data-hs-tab="#card-type-tab-2" aria-controls="card-type-tab-2" role="tab">
                                    {x.label}
                                </button>
                            </Link>
                        })
                    }
                </nav>
            </div>

        </div>
    );
}