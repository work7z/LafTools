
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTypes, Model } from 'sequelize'

// test 1+1 = 2
test('1+1=2', async () => {
    expect(1 + 1).toBe(2)
})