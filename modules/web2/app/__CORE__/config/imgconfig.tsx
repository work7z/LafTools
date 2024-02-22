import { isDevEnv, isTestEnv } from "../hooks/env"

export let getAppIcon = (): string => {
    if (isDevEnv()) {
        return 'icon-dev.png'
    }
    if (isTestEnv()) {
        return 'icon-uat.png'
    }
    return 'icon.png'
}