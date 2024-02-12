import { Dot } from "../utils/TranslationUtils"

export const getPureWebsiteName = () => {
    return Dot("UED59zbd-", "ELB3 Community", "elb3")
}

export const getWebDesc = () => {
    return Dot("lWqYc", "ELB3 community is derived from the WeChat group {0}, in this community, we study knowledge and share our life stories, experiences, and thoughts.", "English Learning Base III")
}

export const getWebsiteName = (subPage?: string) => {
    let str = getPureWebsiteName()
    if (!subPage) {
        subPage = Dot("OBjaZqTvx", "Home")
    }
    if (subPage) {
        return `${subPage} - ${str}`
    }
    return str
}