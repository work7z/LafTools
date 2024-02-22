import fs from 'fs';

export default let fsutils = {
    fileExists: (file: string) => {
        return fs.existsSync(file)

    },
    dirExists: (dir: string) => {
        return fs.existsSync(dir)
    },
    mkdir: (dir: string): string => {
        if (fs.existsSync(dir)) {
            return dir;
        }
        fs.mkdirSync(dir, {
            recursive: true
        })
        return dir;
    },
}