// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 7 Mar 2024
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

import VerCompareUtils from './VerCompareUtils';

import { expect, test, test as describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTypes, Model } from 'sequelize'
import model from './model';
import VerCompareUtils from './VerCompareUtils';

test('removeAlphaOrBeta should remove alpha or beta from version', () => {
    const version = '1.2.3-alpha';
    const expected = '1.2.3';
    const result = VerCompareUtils.removeAlphaOrBeta(version);
    expect(result).toBe(expected);
});

test('isNewVersion should return true if new version is greater than current version', () => {
    const currentVersion = '1.2.3';
    const newVersion = '2.0.0';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(true);
});
test('isNewVersion FZIavIOwI', () => {
    const currentVersion = '2.0.0';
    const newVersion = '2.0.10';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(true);
});
test('isNewVersion NMxzna31n', () => {
    const currentVersion = '2.0.1';
    const newVersion = '2.0.10';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(true);
});
test('isNewVersion z9Au6E0z1', () => {
    const currentVersion = '2.0.1';
    const newVersion = '2.0.23';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(true);
});

test('isNewVersion should return false if new version is not greater than current version', () => {
    const currentVersion = '2.0.0';
    const newVersion = '1.2.3';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(false);
});