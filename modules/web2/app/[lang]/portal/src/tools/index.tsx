import React from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, light_border_clz_all, tw } from '@/app/[lang]/styles';
import { Dot } from '@/app/__CORE__/utils/TranslationUtils';
import ToolsNavigator from './navigator';
import Link from 'next/link';
import { fmtURL_Server } from '@/app/__CORE__/utils/routeUtils';
import ExtensionView from './extensionView'
export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: light_border_clz_all
    }
}

export default () => {
    let secondaryPanelClzHeader = tw('bg-slate-50 g-card-header dark:bg-slate-700')
    return <div>
        <div className='flex flex-row space-x-2'>
            <div className='flex-1  space-y-2'>
                <Card {...getCardsProps()} className={light_border_clz_all}>
                    <ToolsNavigator></ToolsNavigator>
                    <CardBody className='p-0'>
                        <div className='w-full h-full'>
                            <ExtensionView />
                        </div>
                    </CardBody>
                </Card>
                <Card {...getCardsProps()}>
                    <CardHeader className={secondaryPanelClzHeader}>{Dot("FAQ", "Frequently Asked Questions")}</CardHeader>
                    <CardBody>
                        <div>
                            <div>item1</div>
                            <div>item1</div>
                            <div>item3</div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='w-64  space-y-2'>
                <Card {...getCardsProps()}>
                    <CardHeader className={secondaryPanelClzHeader}>{Dot("azsd", "Quick Navigation")}</CardHeader>
                    <CardBody>
                        {/* p-2  hover:border-purple-100 border-2 */}
                        <Link className='flex flex-row items-center justify-center ' href={fmtURL_Server('/client')}>
                            <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                <img src='/controls/text-editor.png' className='w-5 h-5 mr-[2px] ' />
                                <span className=''>
                                    {Dot("Jq7x3Igk0", "Try Client UI Style")}
                                </span>
                            </button>
                        </Link>
                    </CardBody>
                </Card>
                <Card {...getCardsProps()}>
                    <CardHeader className={secondaryPanelClzHeader}>{Dot("rzoFmjStq", "Relevant Tools")}</CardHeader>
                    <CardBody>
                        <ul className={"list-disc ml-5"}>
                            <li>item1</li>
                            <li>item2</li>
                            <li>item3</li>
                        </ul>
                    </CardBody>
                </Card>
                <Card {...getCardsProps()}>
                    <CardHeader className={secondaryPanelClzHeader}>{Dot("dO6b2Tkqwe", "Recently Used Tools")}</CardHeader>
                    <CardBody>
                        <div>used tools</div>
                    </CardBody>
                </Card>
                <Card {...getCardsProps()}>
                    <CardHeader className={secondaryPanelClzHeader}>{Dot("lDXWMq43S", "Today Calendar")}</CardHeader>
                    <CardBody>
                        <div>
                            <div>item1</div>
                            <div>item1</div>
                            <div>item3</div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    </div>
}