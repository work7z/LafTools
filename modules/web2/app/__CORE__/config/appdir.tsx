import path from "path"
import { getLafToolsDataDir } from "./homedir"
import { isDevEnv } from "../hooks/env"
import fsutils from "../utils/FileUtils"

export let getAppDataInternalDir = (): string => {
    return fsutils.mkdir(path.join(getLafToolsDataDir(), 'data'))
}

export let getAppDatabaseMainFile = () => {
    return path.join(getAppDataInternalDir(), 'app.db')
}

export let getAppDatabaseVerFile = () => {
    return fsutils.mkdir(path.join(getAppDataInternalDir(), 'app.ver'))
}

export let getAppDataTestKVDir = () => {
    if (!isDevEnv()) {
        throw new Error('[ERROR:dyLeCZv0g]')
    }
    return fsutils.mkdir(path.join(getAppDataInternalDir(), '_kv'))
}