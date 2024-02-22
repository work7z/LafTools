import { getAppDataTestKVDir } from "../config/appdir"
import { isDevEnv } from "../hooks/env"
import fs from 'fs'
import path from 'path'
let globalKV: { [key: string]: string } = {}

let isDev = isDevEnv()

let kvDir = getAppDataTestKVDir()

export default {
    getKey: (key: string): string | null => {
        if (isDev) {
            // get  $kvDir/$key, return its value or empty
            let file = path.join(kvDir, key)
            if (fs.existsSync(file)) {
                return fs.readFileSync(file, { encoding: 'utf8' })
            }
            return null
        }
        return globalKV[key]
    },
    setKey: (key: string, value: string) => {
        if (isDev) {
            let file = path.join(kvDir, key)
            fs.writeFileSync(file, value, { encoding: 'utf8' })
            return
        }
        globalKV[key] = value
    }
}