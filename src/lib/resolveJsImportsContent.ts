import { ParserOptions } from 'prettier';
import { init, parse } from 'es-module-lexer'
import MagicString from 'magic-string';

import { importSort } from '../print/rules'
import { concatStr } from './utils'


let inited = false
init.then(() => inited = true)

export function resolveJsImportsContent(source: string, options: ParserOptions) {
  if (!inited) return source
  const imports = parse(source)[0];
  const newImports = importSort(imports, source, options)
  const importStr = concatStr(newImports, options.semi)
  const magicString = new MagicString(source)
  return magicString.overwrite(imports[0].ss, imports[imports.length - 1].se + 2, importStr).toString()
}