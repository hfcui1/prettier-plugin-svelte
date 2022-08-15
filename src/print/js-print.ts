import { Doc, doc, FastPath, ParserOptions } from 'prettier';
const {
  concat,
  join,
  line,
  group,
  indent,
  dedent,
  softline,
  hardline,
  fill,
  breakParent,
  literalline,
} = doc.builders;

export type PrintFn = (path: FastPath) => Doc;

export function print(path: FastPath, options: ParserOptions, print: PrintFn): Doc {
  const node: Node = path.getNode();

  return group(node)
}