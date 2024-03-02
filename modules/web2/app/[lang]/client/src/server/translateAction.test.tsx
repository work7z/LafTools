

import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTypes, Model } from 'sequelize'
import i18nItems from '../../../../__CORE__/config/i18n';
import { translateText } from './translateAction';


test('Test Translation Utils', async () => {
    for (let eachItem of i18nItems) {
        let v = await translateText('hello, this is a testing!', 'en', eachItem.Value)
        console.log('result', v)
        // TODO: add cases to check result
    }
}, 1000000);