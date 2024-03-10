// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Thu, 22 Feb 2024
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

import { Sequelize, } from 'sequelize';
import { SystemConfig as SystemConfig } from "./etc/types"
import fs from 'fs'
import path from 'path'
import { log } from 'console';
import { RedisClientType, createClient } from 'redis';
import { SystemEnvFlag, getELB3Root, getSysEnv, isDevEnv, isTestEnv } from '../hooks/env';
import model, { DB_VERSION, } from './model';
import refMap from './ref';
import kvUtils from '../utils/kvUtils';
import { getAppDatabaseMainFile } from '../config/appdir';

export type DaoRef = {
    db: Sequelize,
    redis: RedisClientType
}

let lock = false
let loadDAO = async (): Promise<DaoRef> => {
    console.log('initializing DAO Ref...')
    lock = true;
    try {
        let envFlag: SystemEnvFlag = getSysEnv()
        if (refMap[envFlag]) {
            return refMap[envFlag]
        }
        log("envFlag", envFlag)

        let appDatabase = getAppDatabaseMainFile()
        let sequelize = new Sequelize('', '', '', {
            dialect: 'sqlite',
            storage: appDatabase,
        })

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }


        let r: DaoRef = {
            redis: {} as any, // TODO: redis is not used in this project.
            db: sequelize,
        }

        console.log('established connection, setup model...')

        // 3. setup model 
        await model(r)

        // options
        let setKey = "sys-db-version"
        // check db version
        let currentVersion = await kvUtils.getKey(setKey)
        if (currentVersion !== DB_VERSION) {
            console.log('db version not match, reset the db')
            await sequelize.sync({ force: true })
            await kvUtils.setKey(setKey, DB_VERSION)
        }

        console.log('ok, setup the model')
        refMap[envFlag] = r;

        lock = false;

        return r
    } catch (e) {
        console.log('failed, got errors', e)
        lock = false;
        throw e;
    }
}
export default loadDAO