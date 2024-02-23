// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
// Author:   
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
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

import {
    Sequelize, DataTypes, Model, InferCreationAttributes, InferAttributes, CreationOptional
} from 'sequelize';
import { DaoRef } from './index'
import { isDevEnv } from '../hooks/env';

export const DB_VERSION = "v4"

// model for local user
export class LocalUser extends Model<InferAttributes<LocalUser>, InferCreationAttributes<LocalUser>> {
    declare id: number;
    declare userId: string;
    declare username: string;
    declare password: string; // lock LafTools
    declare createdAt: CreationOptional<Date> | null;
    declare updatedAt: CreationOptional<Date> | null;
    declare deleteAt: CreationOptional<Date> | null;
}



export default async (daoRef: DaoRef) => {
    let sequelize = daoRef.db


    await LocalUser.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleteAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        paranoid: false,
        modelName: "LocalUser",
        tableName: "local_user"
    })

}