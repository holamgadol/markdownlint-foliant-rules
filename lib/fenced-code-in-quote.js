// @ts-check

'use strict'
const inQuoteFence = /^> {0,4}[`~]+/

const { addError, filterTokens } = require('markdownlint-rule-helpers')

module.exports = {
  names: ['fenced-code-in-quote'],
  description: "Fenced code shouldn't be in quote",
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#fenced-code-in-quote'),
  tags: ['fence', 'quote'],
  function: function fencedCodeInQuote (params, onError) {
    filterTokens(params, 'fence', function forToken (token) {
      if (inQuoteFence.test(token.line)) {
        addError(onError, token.lineNumber)
      }
    })
  }
}
