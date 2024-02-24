import React from 'react';
import { Autocomplete, AutocompleteItem, CardProps } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, border_clz_all } from '@/app/[lang]/styles';

export let getCardsProps = (): CardProps => {
    return {
        radius: "none", shadow: "none", className: border_clz_all
    }
}

export default () => {
    return <div>
        <div className='flex flex-row space-x-2'>
            <div className='w-60'>
                <Card {...getCardsProps()}>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
            </div>
            <div className='flex-1'>
                <Card  {...getCardsProps()}>
                    <CardBody>
                        <p>center</p>
                    </CardBody>
                </Card>
            </div>
            <div className='w-64'>
                <Card {...getCardsProps()} >
                    <CardBody>
                        <p>right</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    </div>
}