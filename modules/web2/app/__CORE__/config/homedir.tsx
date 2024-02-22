import fs from 'fs'
import path from 'path'
import fsutils from '../utils/FileUtils'

let userHome = process.env.HOME || process.env.USERPROFILE || ''

export let getUserHomeDir: () => string = () => {
    return userHome
}

export let getLafToolsDataDir = (): string => {
    return fsutils.mkdir(path.join(userHome, 'LafTools'))
}