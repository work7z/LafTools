import fs from 'fs'
import path from 'path'

export type FileInfo = {
    fileName: string,
    comments: string,
    destinations: string[],
}

let markdownFiles: FileInfo[] = [
    {
        fileName: "README.md",
        comments: 'This is the main file',
        destinations: ['/', '/docs']
    }
]

export default markdownFiles