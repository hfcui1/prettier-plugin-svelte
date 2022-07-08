import path from 'path'
import fs from 'fs'
import { EOL } from 'os';

export function pathResolve(...paths: Array<string>) {
    return path.resolve(process.cwd(), ...paths)
}

export function isArray<T = unknown>(value: unknown): value is Array<T> {
    return Array.isArray(value);
}

export function concatFilesStr(paths: Array<string>) {
    return paths.reduce((preValue, _path) => {
        const fullPath = pathResolve(_path)
        const fileExit = fs.existsSync(fullPath)
        if (!fileExit) {
            console.log(new Error(`${fullPath} no found`))
            return preValue
        }
        return preValue + fs.readFileSync(fullPath, { encoding: 'utf-8' }).toString().replace(new RegExp(EOL, 'g'), '')
    }, '')
}

export function readFileToStr(_path: string) {
    const fullPath = pathResolve(_path)
    const fileExit = fs.existsSync(fullPath)
    if (!fileExit) {
        console.log(new Error(`${fullPath} no found`))
        return ''
    }

    return fs.readFileSync(fullPath, { encoding: 'utf-8' }).toString()
}