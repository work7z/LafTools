// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 2 Mar 2024
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



import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTypes, Model } from 'sequelize'
import { translateText } from './translateAction';
import { fn_Geti18n } from '../i18n-pure';


test('Test Translation Utils', async () => {
    let i18nItems = fn_Geti18n((a, ...b) => b[0]);

    for (let eachItem of i18nItems) {
        let v = await translateText('hello, this is a testing!', 'en', eachItem.Value)
        console.log('result', v)
        // TODO: add cases to check result
    }
}, 1000000);