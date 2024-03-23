'use client'

import React from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, light_border_clz_all, tw } from '@/app/__CORE__/meta/styles';
import { Dot } from '@/app/__CORE__/utils/TranslationUtils';
import SubTabNav from '../nav/nav-sub-tab';
import Link from 'next/link';
import { fmtURL_Server } from '@/app/__CORE__/utils/routeUtils';
import ToolView from './view-tools'
import { useConstructedKeyAndInit } from '@/app/[lang]/client/src/initapp';
import FundrasingPlanBtn from '../cpt/cpt-fundrasing-btn';
import Sidebar from './main-sidebar';
import { ToolProp } from '.';
import ExtraListTool from './extra-list-tool';
import { notFound } from 'next/navigation';
import { ToolSearchDetail } from '@/app/[lang]/page';
import { Button, Dialog, DialogBody, DialogFooter } from '@blueprintjs/core';

export default () => {
    return <Dialog title="Informational dialog" icon="info-sign">
        <DialogBody>
            <p>
                This is an informational dialog. It only informs the user and doesn't require any action.
            </p>
        </DialogBody>
        <DialogFooter actions={<Button intent="primary" text="Close" onClick={() => {
            //
        }} />} />
    </Dialog>
}


{/* <ToolView
            {...props}
            searchToolItem={{
                id: props.searchToolItem.id,
                label: 'new item',
                toolId: 'edc_base32'
            }}
        /> */}