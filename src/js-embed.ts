import { Doc, doc, FastPath, ParserOptions } from 'prettier';
import { getText } from './lib/getText';
import { PrintFn } from './print';
import { removeParentheses } from './print/doc-helpers';
import { Node } from './print/nodes';

const {
    builders: { concat, hardline, group, indent, literalline },
    utils: { removeLines },
} = doc;

export function embed(
    path: FastPath,
    print: PrintFn,
    textToDoc: (text: string, options: object) => Doc,
    options: ParserOptions,
): Doc | null {
    const node: Node = path.getNode();

    try {
      const embeddedOptions: any = {
          parser: expressionParser,
      };
      if (node.forceSingleQuote) {
          embeddedOptions.singleQuote = true;
      }

      let docs = textToDoc(forceIntoExpression(getText(node, options)), embeddedOptions);
      if (node.forceSingleLine) {
          docs = removeLines(docs);
      }
      if (node.removeParentheses) {
          docs = removeParentheses(docs);
      }
      return docs;
  } catch (e) {
      return getText(node, options);
  }
}

function forceIntoExpression(statement: string) {
    // note the trailing newline: if the statement ends in a // comment,
    // we can't add the closing bracket right afterwards
    return `(${statement}\n)`;
}

function expressionParser(text: string, parsers: any, options: any) {
    const ast = parsers.babel(text, parsers, options);

    return { ...ast, program: ast.program.body[0].expression };
}
