// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Tue, 19 Mar 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

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
import MultipleTextTranslator from '@/app/[lang]/client/src/pages/WorkBench/FixedLayout/Main/Center/nav/bottom/Translator/MultipleTextTranslator';
export type TitleLinkType = { title: string, link: string }
let d = loadDOT("6ar89C-Fh")

export default (props: { id: string }) => {
    d()
    let { id } = props;
    if (id == 'translation') {
        return <MultipleTextTranslator />
    }
    if (id == 'todo') {
        return 'this is todo'
    }
    if (id == 'stopwatch') {
        return 'this is stopwatch'
    }
    if (id == 'dictionary') {
        return <iframe src={'https://dict.youdao.com/result?word=hello&lang=en'} className='w-full h-[1200px]'></iframe>
    }
    return ''
}