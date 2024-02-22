import { Sequelize, } from 'sequelize';
import { SystemConfig as SystemConfig } from "../../../../../etc/types"
import fs from 'fs'
import path from 'path'
import { log } from 'console';
import { RedisClientType, createClient } from 'redis';
import { SystemEnvFlag, getELB3Root, getSysEnv, isDevEnv, isTestEnv } from '../hooks/env';
import model, { DB_VERSION, InvitationCode } from './model';
import refMap from './ref';


export type DaoRef = {
    db: Sequelize,
    redis: RedisClientType
}


export let getConfigByFlag = (envFlag: SystemEnvFlag): SystemConfig => {
    let config = fs.readFileSync(path.join(getELB3Root(), 'etc', envFlag + '-config.json'), { encoding: 'utf-8' })
    return JSON.parse(config) as SystemConfig
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
        let config = getConfigByFlag(envFlag)

        let link = config.database.link
        log("connect to DB: " + link)
        let sequelize = new Sequelize(`${link}`, isTestEnv() ? {} : {
            dialect: 'mysql',
            dialectModule: require('mysql2'),
            logging: console.log,
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

        console.log('established connection, setup model...')

        // 3. setup model 
        await model(r)
        

        // options
        let setKey = "db-version"
        // check db version
        let currentVersion = await r.redis.get(setKey)
        if (currentVersion !== DB_VERSION) {
            console.log('db version not match, reset the db')
            await sequelize.sync({ force: true })
            await r.redis.set(setKey, DB_VERSION)
        }

        if(isDevEnv()){
            let a = await InvitationCode.create({
                code: "test100",
                useCount: 0,
                maxUseCount: 500,
                expiredAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // expired after 30 days
            },)
            console.log('test invitation code', a.toJSON())
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