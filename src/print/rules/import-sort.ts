import MagicString from 'magic-string';
import { ImportSpecifier } from 'es-module-lexer'
import { ParserOptions } from 'prettier'

export function importSort(imports: readonly ImportSpecifier[], content: string, options: ParserOptions) {
  const libraries: ImportSpecifier[] = []
  const globals: ImportSpecifier[] = []
  const locals: ImportSpecifier[] = []
  const actions = {
    Local: (it: ImportSpecifier) => locals.push(it),
    Global: (it: ImportSpecifier) => globals.push(it),
    Library: (it: ImportSpecifier) => libraries.push(it),
  }

  imports.map(it => {
    const importPath = it.n
    if (!importPath) {
      return
    }

    const importType = getImportType(it.n as string, options.pathAlias)
    actions[importType](it)
  })
  const globalItemRegexp = /^(?<alias>.*?)\/(?<path>(?<dir>.*?)[\/$](.*\/(?<deepFileName>.*$)|(?<shadowFileName>.*$)))/
  const localItemRegexp = /.*\/(?<fileName>.*)$/

  const newLibraries = libraries.sort((importSpecifierA, importSpecifierB) => compareStr(cleanPathString(importSpecifierA.n || ''), cleanPathString(importSpecifierB.n || '')))
  const newGlobals = globals.sort((importSpecifierA, importSpecifierB) => {
    const importPathA = importSpecifierA.n || ''
    const importPathB = importSpecifierB.n || ''
    const matchResultA: any = importPathA.match(globalItemRegexp)
    const matchResultB: any = importPathB.match(globalItemRegexp)
    if (matchResultA === null) {
      console.error(`${importSpecifierA} not is global import`)
      return 0
    }
    if (matchResultB === null) {
      console.error(`${importSpecifierB} not is global import`)
      return 0
    }
    const dirResult = compareDir(matchResultA.groups.dir, matchResultB.groups.dir, options.svelteImportOrderDirs || [])
    if (dirResult !== 0) {
      return dirResult
    }
    const pathStrA = matchResultA.groups.path || ''
    const pathStrB = matchResultB.groups.path || ''
    return compareStr(cleanPathString(pathStrA), cleanPathString(pathStrB))
  })
  const newLocals = locals.sort((importSpecifierA, importSpecifierB) => {
    debugger
    const importPathA = importSpecifierA.n || ''
    const importPathB = importSpecifierB.n || ''

    const matchResultA: any = importPathA.match(localItemRegexp)
    const matchResultB: any = importPathB.match(localItemRegexp)

    if (matchResultA === null) {
      console.error(`${importSpecifierA} not is local import`)
      return 0
    }
    if (matchResultB === null) {
      console.error(`${importSpecifierB} not is local import`)
      return 0
    }

    const fileA = matchResultA.groups.fileName || ''
    const fileB = matchResultB.groups.fileName || ''

    const fileResult = compareFile(fileA, fileB, options.svelteImportOrderFiles || [])
    if (fileResult !== 0) {
      return fileResult
    }
    const pathStrA = matchResultA.groups.path || ''
    const pathStrB = matchResultB.groups.path || ''
    return compareStr(cleanPathString(pathStrA), cleanPathString(pathStrB))
  })

  return [
    ...newLibraries,
    ...newGlobals,
    ...newLocals
  ].map(importSpecifier => extractImportString(importSpecifier, content))
}

function compareDir(dirA: string, dirB: string, svelteImportOrderDirs: ParserOptions['svelteImportOrderDirs']) {
  const orderIndexA = svelteImportOrderDirs.indexOf(dirA)
  const orderIndexB = svelteImportOrderDirs.indexOf(dirB)
  return orderIndexA - orderIndexB
}
function compareFile(fileA: string, fileB: string, svelteImportOrderFiles: ParserOptions['svelteImportOrderFiles']) {
  function matchFile(fileName: string, config: string) {
    if (config.includes('*')) {
      return new RegExp(`${config.replace(/\*/g, '')}\$`).test(fileName)
    }
    return config === fileName
  }
  const orderIndexA = svelteImportOrderFiles.findIndex(configName => matchFile(fileA, configName))
  const orderIndexB = svelteImportOrderFiles.findIndex(configName => matchFile(fileB, configName))
  return orderIndexA - orderIndexB
}
function compareStr(strA: string, strB: string) {
  return strA.localeCompare(strB)
}

function extractImportString(importSpecifier: ImportSpecifier, content: string) {
  const s = new MagicString(content);
  return s.slice(importSpecifier.ss, importSpecifier.se)
}

function cleanPathString(ps: string) {
  return ps.replace(/\//g, '')
}

function getImportType(importPath: string, alias: string[]) {
  const localPathReg = /^\./
  if (localPathReg.test(importPath)) {
    return 'Local'
  }

  const aliasItem = alias.find(a => new RegExp(`\^${a}`).test(importPath))
  if (aliasItem) {
    return 'Global'
  }

  return 'Library'
}