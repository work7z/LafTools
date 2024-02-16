import path from "path";
export type SystemEnvFlag = "development" | "production" | "test"

let envObj: { env: SystemEnvFlag } = {
    env: process.env.NODE_ENV
}

export let markEnvAsDevForcibly = () => {
    envObj.env = 'development'
}

export let getSysEnv = () => {
    return envObj.env;
}

export let isDevEnv = () => {
    return envObj.env === 'development';
}

export let isTestEnv = () => {
    return envObj.env === 'test';
}

export let isProductionEnv = () => {
    return envObj.env === 'test';
}

export let getELB3Root = (): string => {
    return process.env['ELB3_ROOT'] || 'unknowndir'
}


export let getPreCompiledDir = (): string => {
    let file = path.join(getELB3Root(), 'precompiled', isDevEnv() ? 'dev' : 'prod')
    return file;
}
