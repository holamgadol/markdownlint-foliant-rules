// @ts-check

'use strict'
const nonLiteral = /[^a-zA-Z0-9_\-\s+]+/

const { addError, filterTokens } = require('markdownlint-rule-helpers')

module.exports = {
  names: ['non-literal-fence-label'],
  description: 'Invalid language label in fenced code block',
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#non-literal-fence-label'),
  tags: ['fence', 'label'],
  function: function nonLiteralFencelabel (params, onError) {
    const backend = String((params.config.backend === undefined) ? 'hugo' : params.config.backend)
    if (backend === 'mkdocs') {
      filterTokens(params, 'fence', function forToken (token) {
        if (nonLiteral.test(token.info)) {
          addError(onError, token.lineNumber)
        }
      })
    }
  }
}
