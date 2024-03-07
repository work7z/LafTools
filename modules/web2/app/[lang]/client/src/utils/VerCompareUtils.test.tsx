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

test('isNewVersion should return false if new version is not greater than current version', () => {
    const currentVersion = '2.0.0';
    const newVersion = '1.2.3';
    const result = VerCompareUtils.isNewVersion(currentVersion, newVersion);
    expect(result).toBe(false);
});