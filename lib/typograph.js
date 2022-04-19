'use strict'
const hyphenBetweenWords = /[^\s\\] - [^\s\\]/
const dashBetweenWords = /[^\s\\]–[^\s\\]/
const {
  addError,
  forEachInlineChild,
  rangeFromRegExp
} = require('markdownlint-rule-helpers')

module.exports = {
  names: ['typograph'],
  description: 'typograph error',
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#typograph'),
  tags: ['text'],
  function: function typograph (params, onError) {
    forEachInlineChild(params, 'text', function forToken (token) {
      if (hyphenBetweenWords.test(token.line)) {
        const range = rangeFromRegExp(token.line, hyphenBetweenWords)
        const fixInfo = {
          editColumn: range[0] + 2,
          deleteCount: 1,
          insertText: '–'
        }
        addError(
          onError,
          token.lineNumber,
          'hyphen instead of dash',
          null,
          range,
          fixInfo
        )
      }
      if (dashBetweenWords.test(token.line)) {
        const range = rangeFromRegExp(token.line, dashBetweenWords)
        const fixInfo = {
          editColumn: range[0] + 1,
          deleteCount: 1,
          insertText: '-'
        }
        addError(
          onError,
          token.lineNumber,
          'dash instead of hyphen',
          null,
          range,
          fixInfo
        )
      }
    })
  }
}
