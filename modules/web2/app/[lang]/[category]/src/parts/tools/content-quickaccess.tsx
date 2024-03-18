'use client'

import React, { useEffect } from 'react';
import { Autocomplete, AutocompleteItem, CardProps, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { border_clz, light_border_clz_all, tw } from '@/app/__CORE__/meta/styles';
import Sidebar from './main-sidebar';
import { ToolProp } from '.';
import ExtraListTool from './extra-list-tool';
import { Dot } from '@/app/__CORE__/utils/cTranslationUtils';
import _ from 'lodash';
import gutils from '@/app/[lang]/client/src/utils/GlobalUtils';
import { loadDOT } from '@/app/__CORE__/utils/i18n-types';
import { getQuickAccessList } from './sidebar-quickaccess';
import ContentQuickaccess from './content-quickaccess';
export type TitleLinkType = { title: string, link: string }
let d = loadDOT("6ar89C-Fh")

export default (props: { id: string }) => {
    d()
    let { id } = props;
    if (id == 'translation') {
        return 'this is translation'
    }
    if (id == 'todo') {
        return 'this is todo'
    }
    if (id == 'stopwatch') {
        return 'this is stopwatch'
    }
    if (id == 'dictionary') {
        return 'this is dictionary'
    }
    return ''
}