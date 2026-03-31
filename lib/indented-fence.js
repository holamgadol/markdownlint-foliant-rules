// @ts-check

'use strict'
const indentedLessThanFour = /^\s{1,3}[`~]{3}/

const { filterByTypes } = require('markdownlint-rule-helpers/micromark')
const { addErrorContext } = require('markdownlint-rule-helpers')

module.exports = {
  names: ['indented-fence'],
  description: "Fenced code shouldn't be indented by 1 to 3 spaces",
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#indented-fence'),
  tags: ['fence', 'indent'],
  parser: 'micromark',
  function: function indentedFence (params, onError) {
    const tokens = filterByTypes(params.parsers.micromark.tokens, ['codeFenced'])
    tokens.forEach(token => {
      if (indentedLessThanFour.test(params.lines[token.startLine - 1])) {
        addErrorContext(onError, token.startLine, params.lines[token.startLine - 1])
      }
    })
  }
}
