// @ts-check

'use strict'
const inQuoteFence = /^> {0,4}[`~]+/

const { filterByTypes } = require('markdownlint-rule-helpers/micromark')
const { addError } = require('markdownlint-rule-helpers')

module.exports = {
  names: ['fenced-code-in-quote'],
  description: "Fenced code shouldn't be in quote",
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#fenced-code-in-quote'),
  tags: ['fence', 'quote'],
  parser: 'micromark',
  function: function fencedCodeInQuote (params, onError) {
    const tokens = filterByTypes(params.parsers.micromark.tokens, ['codeFenced'])
    tokens.forEach(token => {
      if (inQuoteFence.test(params.lines[token.startLine - 1])) {
        addError(onError, token.startLine)
      }
    })
  }
}
