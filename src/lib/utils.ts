import path from 'path'
import fs from 'fs'
import os from 'os'

export function pathResolve(...paths: Array<string>) {
    return path.resolve(workspace, ...paths)
}

export function isArray<T = unknown>(value: unknown): value is Array<T> {
    return Array.isArray(value);
}

const workspaceMath =  __dirname.match(/^(?<workspace>.*?)\/node_modules/)
export const workspace = process.cwd() === '/' ? workspaceMath !== null ? (workspaceMath.groups as any).workspace : __dirname : process.cwd()

export function concatFilesStr(paths: Array<string>) {
    return paths.reduce((preValue, _path) => {
        const fullPath = pathResolve(_path)
        const fileExit = fs.existsSync(fullPath)
        if (!fileExit) {
            console.log(new Error(`${fullPath} no found`))
            return preValue
        }
        return preValue + fs.readFileSync(fullPath, { encoding: 'utf-8' }).toString().replace(new RegExp('\\n', 'g'), '')
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

export function concatStr(list: string[]) {
    return list.reduce((preValue, item) => {
        preValue += `${item}${os.EOL}`
        return preValue
    }, '')
}