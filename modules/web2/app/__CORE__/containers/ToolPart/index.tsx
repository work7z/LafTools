import React from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, border_clz_all, tw } from '@/app/[lang]/styles';
import { Dot } from '../../utils/TranslationUtils';
import ToolsNavigator from './toolsNavigator';

export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: border_clz_all
    }
}

export default () => {
    let secondaryPanelClzHeader = tw('bg-slate-50 g-card-header dark:bg-slate-700')
    return <div>
        <div className='flex flex-row space-x-2'>
            <div className='flex-1  space-y-2'>
                <ToolsNavigator></ToolsNavigator>
                <Card {...getCardsProps()} className=''>
                    <CardBody>
                        <div className='min-h-60'>
                            <div>item1</div>
                            <div>item1</div>
                            <div>item3</div>
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
            <div className='w-56  space-y-2'>
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