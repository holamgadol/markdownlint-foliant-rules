// @ts-check

'use strict'
const indentedLessThanFour = /^\s{1,3}[`~]{3}/

const { addErrorContext, filterTokens } = require('markdownlint-rule-helpers')

module.exports = {
  names: ['indented-fence'],
  description: "Fenced code shouldn't be indented by 1 to 3 spaces",
  tags: ['fence', 'indent'],
  function: function indentedFence (params, onError) {
    filterTokens(params, 'fence', function forToken (token) {
      if (indentedLessThanFour.test(token.line)) {
        addErrorContext(onError, token.lineNumber, token.line)
      }
    })
  }
}
