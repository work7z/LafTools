export let isDevEnv = () => {
    return process.env.NODE_ENV === 'development';
}

export let getELB3Root = ():string=>{
    return process.env['ELB3_ROOT'] || 'unknowndir'
}