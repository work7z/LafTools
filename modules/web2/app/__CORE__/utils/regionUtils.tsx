'use client'

let regionUtils = {
    getCNHosts(): string[] {
        return ["laf-tools.com"]
    },
    getUSHosts(): string[] {
        return ["laftools.dev"]
    },
    isCNHost(): boolean {
        let host = location.hostname
        return this.getCNHosts().includes(host)
    },
    isUSHost(): boolean {
        let host = location.hostname
        return this.getUSHosts().includes(host)
    },
    isCurrentUserPossibleChinese(): boolean {
        let arr = navigator.languages.map(x => x.toLowerCase())
        return arr.includes("zh-cn") || arr.includes("zh-hk") || arr.includes("zh-tw") || arr.includes("zh")
    }
}

export default regionUtils