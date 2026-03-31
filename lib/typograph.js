'use strict'
const hyphenBetweenWords = /[^\s\\>] - [^\s\\]/g
const dashBetweenWords = /[^\s\\>]–[^\s\\]/g
const admonitionCheck = /\s*((!!!)|(\?\?\?\+)|(\?\?\?)) /
const tabCheck = /\s*=== /

const { filterByTypes } = require('markdownlint-rule-helpers/micromark')
const { addError, isBlankLine } = require('markdownlint-rule-helpers')

function rangeFromRegExp (line, regexp) {
  let range = null
  regexp.lastIndex = 0
  const match = Array.from(line.matchAll(regexp))
  if (match.length !== 0) {
    range = []
    match.forEach(matchItem => {
      const column = matchItem.index + 1
      const length = matchItem[0].length
      range.push([column, length])
    })
  }
  return range
}
module.exports = {
  names: ['typograph'],
  description: 'typograph error',
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#typograph'),
  tags: ['text'],
  asynchronous: true,
  parser: 'micromark',
  function: async function typograph (params, onError) {
    const { lines } = params
    const mdlint = await import('markdownlint/promise')

    const codeTokens = filterByTypes(params.parsers.micromark.tokens, ['codeIndented'])
    for (const token of codeTokens) {
      let i = token.startLine - 2
      while (isBlankLine(lines[i]) && i > 0) {
        i -= 1
      }
      const aboveText = lines[i]
      if (admonitionCheck.test(aboveText) || tabCheck.test(aboveText)) {
        const titleIndent = aboveText.match(/^\s*/)[0].length
        let content = token.text
        if (/^ {2}[^ ]/gm.test(content)) {
          content = content.replace(/^ {2}/gm, '')
        }
        const contentIndent = new RegExp('^( {' + String(titleIndent + 4 - token.startColumn + 1) + '}|\t{' + String(token.startColumn - titleIndent) + '})', 'gm')
        content = content.replace(contentIndent, '')
        const lintOptions = {
          config: { default: false, typograph: 'warning' },
          customRules: [{
            names: ['typograph'],
            description: this.description,
            information: this.information,
            tags: this.tags,
            asynchronous: this.asynchronous,
            parser: this.parser,
            function: this.function
          }],
          handleRuleFailures: true,
          strings: { [params.name]: content }
        }
        const results = await mdlint.lint(lintOptions)
        results[params.name].forEach(errorItem => {
          const extraIndent = (lines[token.startLine + errorItem.lineNumber - 2].replace(content.split(/\r\n|\n/)[errorItem.lineNumber - 1], '')).length
          if (errorItem.fixInfo) {
            const fixInfo = {
              editColumn: errorItem.fixInfo.editColumn + extraIndent,
              deleteCount: 1,
              insertText: errorItem.fixInfo.insertText
            }
            addError(
              onError,
              token.startLine + errorItem.lineNumber - 1,
              errorItem.errorDetail,
              null,
              [errorItem.errorRange[0] + extraIndent, errorItem.errorRange[1]],
              fixInfo
            )
          }
        })
      }
    }

    const textTokens = filterByTypes(params.parsers.micromark.tokens, ['content', 'atxHeading', 'table'])
    textTokens.forEach(token => {
      const lines = token.text.split(/\r\n|\n/)
      lines.forEach((line, lineIndex) => {
        if (hyphenBetweenWords.test(line)) {
          const ranges = rangeFromRegExp(line, hyphenBetweenWords)
          ranges.forEach(range => {
            const fixInfo = {
              editColumn: range[0] + (params.lines[token.startLine + lineIndex - 1].length - line.length) + 2,
              deleteCount: 1,
              insertText: '–'
            }
            addError(
              onError,
              token.startLine + lineIndex,
              'hyphen instead of dash',
              null,
              [range[0] + (params.lines[token.startLine + lineIndex - 1].length - line.length), range[1]],
              fixInfo
            )
          })
        }
        if (dashBetweenWords.test(line)) {
          const ranges = rangeFromRegExp(line, dashBetweenWords)
          ranges.forEach(range => {
            const fixInfo = {
              editColumn: range[0] + (params.lines[token.startLine + lineIndex - 1].length - line.length) + 1,
              deleteCount: 1,
              insertText: '-'
            }
            addError(
              onError,
              token.startLine + lineIndex,
              'dash instead of hyphen',
              null,
              [range[0] + (params.lines[token.startLine + lineIndex - 1].length - line.length), range[1]],
              fixInfo
            )
          })
        }
      })
    })
  }
}
