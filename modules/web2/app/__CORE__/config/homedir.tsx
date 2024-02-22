import fs from 'fs'
import path from 'path'
import os from 'os'
import fsutils from '../utils/FileUtils'
import { isDevEnv } from '../hooks/env'

let userHome = os.homedir()

export let getUserHomeDir: () => string = () => {
    return userHome
}

export let getLafToolsDataDir = (): string => {
    let n = path.join(userHome, isDevEnv() ? 'LafTools-DEV' : 'LafTools')
    return fsutils.mkdir(n)
}