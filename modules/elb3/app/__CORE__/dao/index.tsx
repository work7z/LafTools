import { Sequelize, } from 'sequelize';
import { SystemConfig as SystemConfig } from "../../../../../config/types"
import fs from 'fs'
import path from 'path'
import { log } from 'console';
import { RedisClientType, createClient } from 'redis';
import { getELB3Root } from '../hooks/env';
import model from './model';


export type DaoRef = {
    db: Sequelize,
    redis: RedisClientType
}

export type SystemFlag = "dev" | "prod" | "test"


export let crtRef: { flag: SystemFlag } = {
    flag: 'test'
}

export let getConfigByFlag = (envFlag: SystemFlag = crtRef.flag): SystemConfig => {
    let config = fs.readFileSync(path.join(getELB3Root(), 'config', envFlag + '.json'), { encoding: 'utf-8' })
    return JSON.parse(config) as SystemConfig
}
if (process.env.NODE_ENV === 'production') {
    crtRef.flag = 'prod'
}
if (process.env.NODE_ENV === 'test') {
    crtRef.flag = 'test'
}
if (process.env.NODE_ENV === 'development') {
    crtRef.flag = 'dev'
}
let lock = false
let refMap: { [key: string]: DaoRef } = {}
let loadDAO = async (): Promise<DaoRef> => {
    console.log('initializing DAO Ref...')
    lock = true;
    try {
        let envFlag: SystemFlag = crtRef.flag
        if (refMap[envFlag]) {
            return refMap[envFlag]
        }
        log("envFlag", envFlag)
        let config = getConfigByFlag(envFlag)

        let link = config.database.link
        log("connect to DB: " + link)
        let sequelize = new Sequelize(`${link}`, {
            dialect: 'mysql',
            dialectModule: require('mysql2'),
            timezone: '+08:00'
        });

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        // 2. redis
        const client = await createClient({
            url: 'redis://localhost:6379'
            //   url: 'redis://alice:foobared@awesome.redis.server:6380'
        })
            .on('error', err => console.log('Redis Client Error', err))
            .connect();

        let r: DaoRef = {
            redis: client as any,
            db: sequelize,
        }

        // 3. setup model 
        await model(r)
        refMap[envFlag] = r;

        lock = false;

        return r
    } catch (e) {
        lock = false;
        throw e;
    }
}
export default loadDAO