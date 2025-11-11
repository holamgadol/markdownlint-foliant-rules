// @ts-check

'use strict'
const nonLiteral = /[^a-zA-Z0-9_\-\s+]+/

const { filterByTypes } = require('markdownlint-rule-helpers/micromark')
const { addError } = require('markdownlint-rule-helpers')

module.exports = {
  names: ['non-literal-fence-label'],
  description: 'Invalid language label in fenced code block',
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#non-literal-fence-label'),
  tags: ['fence', 'label'],
  parser: 'micromark',
  function: function nonLiteralFencelabel (params, onError) {
    const tokens = filterByTypes(params.parsers.micromark.tokens, ['codeFencedFenceInfo'])
    tokens.forEach(token => {
      if (nonLiteral.test(token.text)) {
        addError(onError, token.startLine)
      }
    })
  }
}
