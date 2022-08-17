import {Doc, doc, FastPath, ParserOptions} from 'prettier';
import {AttributeNode} from '../nodes';
import {isArray} from '../../lib/utils';

const {concat, join, line, group, indent, dedent, softline, hardline, fill, breakParent, literalline} = doc.builders;

export function classSortRule(node: AttributeNode, print: (_path: FastPath) => Doc, options: ParserOptions) {
  if (isArray(node.value)) {
    const { textDoc, mustacheTagDoc } = node.value.reduce((preValue, item) => {
      if (item.type === 'Text') {
        preValue.textDoc.push(resolveTextClassnames(item, options))
      }
      if (item.type === 'MustacheTag') {
        preValue.mustacheTagDoc.push(resolveMustacheTagClassnames(item))
      }
      return preValue
    }, { textDoc: [], mustacheTagDoc: [] })

    const textRowList = textDoc.reduce((preValue, list) => {
      preValue.push(...(list.map(item => item.className)))
      return preValue
    }, [])
    const sortedList = [
      ...textRowList,
      ...mustacheTagDoc
    ]
    const sortDoc = sortedList.reduce((preValue, item, index) => {
      if (item === '' || item === undefined) return preValue
      if (index !== 0) {
        preValue.push(line, item)
      } else {
        preValue.push(item)
      }
      return preValue
    }, [])
      return concat([line, node.name, '=', '"', concat(sortDoc), '"']);
    }
}

function resolveTextClassnames(textNode, options) {
  const classNameList = classRowDataToArray(textNode.data)
  const sortResult = classNameList.map(className => ({ className, orderIndex: ensureClassNameOrder(className, options.projectCssContent, options.projectCssOrderContent)})).sort((a, b) => {
    const aIndex = a.orderIndex
    const bIndex = b.orderIndex
    if (aIndex < bIndex) {
      return -1
    } else if (aIndex > bIndex) {
      return 1
    } else {
      return 0
    }
  })

  return sortResult

}

function resolveMustacheTagClassnames(mustacheTagNode) {
  return `{${mustacheTagNode.expression.name}}`
}

function classRowDataToArray(rowData: string) {
  return rowData.split(/\s+/g)
}

function classAttributeToArray(attribute: string) {
  return attribute.split(/\s*;\s*/g).map(item => item.split(/:\s*/)[0].replace(/\s/g, '')).filter(attr => attr)
}

function ensureClassNameOrder(className: string, cssContent: string, cssOrderContent: string) {
  const cssBlockReg = new RegExp(`.${className.replace(':', '\\\\:')}\\s*{(\.\*?)}`)
  const matchResult = cssContent.match(cssBlockReg)

  // 非原子Css，优先级最高
  if (!matchResult) {
    return -1
  }

  const blockCssContent = matchResult[1]
  const cssAttrbutes = classAttributeToArray(blockCssContent)
  const findHeightOrder = cssAttrbutes.reduce((preValue, attr) => {
    const matchResult = cssOrderContent.match(new RegExp(`[^-]${attr}[^-]`))
    const index = matchResult ? matchResult.index || 0 : -1
    if (index > -1 && index < preValue) {
      preValue = index
    }
    return preValue
  }, 999999)

  return findHeightOrder
}