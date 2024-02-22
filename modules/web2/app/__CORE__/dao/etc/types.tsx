export type SystemConfig = {
    database: {
        link: string
    },
    sms: {
        appId: string,
        secretId: string,
        secretKey: string
    }
}