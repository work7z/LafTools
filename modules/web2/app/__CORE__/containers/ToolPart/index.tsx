import React from 'react';
import { Autocomplete, AutocompleteItem, CardProps } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, border_clz_all } from '@/app/[lang]/styles';
import { Dot } from '../../utils/TranslationUtils';

export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: border_clz_all
    }
}

export default () => {
    return <div>
        <div className='flex flex-row space-x-2'>
            <div className='w-60 space-y-2'>
                <Card {...getCardsProps()}>
                    <CardHeader>{Dot("fsIFihs7P", "Relevant Tools")}</CardHeader>
                    <Divider />
                    <CardBody>
                        <div>
                            <div>item1</div>
                            <div>item1</div>
                            <div>item3</div>
                        </div>
                    </CardBody>
                </Card>
                <Card  {...getCardsProps()} >
                    <CardHeader>{Dot("Q_E8YloxG", "Recently Used Tools")}</CardHeader>
                    <Divider />
                    <CardBody>
                        <div>
                            <div>item1</div>
                            <div>item1</div>
                            <div>item3</div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='flex-1  space-y-2'>
                <Card {...getCardsProps()} shadow='md'>
                    <CardHeader>{Dot("flpRJhnFp", "Get result from multiple hash algorithms at the same.")}</CardHeader>
                    <Divider />
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
                    <CardHeader>{Dot("mYhx3AtIK", "Frequently Asked  Questions")}</CardHeader>
                    <Divider />
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