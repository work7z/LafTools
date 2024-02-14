import path from "path";

export let isDevEnv = () => {
    return process.env.NODE_ENV === 'development';
}

export let getELB3Root = (): string => {
    return process.env['ELB3_ROOT'] || 'unknowndir'
}


export let getPreCompiledDir = (): string => {
    let file = path.join(getELB3Root(), 'precompiled', isDevEnv() ? 'dev' : 'prod')
    return file;
}
