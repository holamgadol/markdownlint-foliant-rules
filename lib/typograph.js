'use strict'
const hyphenBetweenWords = /[^\s\\>] - [^\s\\]/
const dashBetweenWords = /[^\s\\>]–[^\s\\]/
const regularSpaceAfterDigit = /\d [a-zA-Zа-яА-Я]/
const noNonBreakingSpaceBeforePercent = /\d( *)%/
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
      if (hyphenBetweenWords.test(token.content)) {
        const range = rangeFromRegExp(token.content, hyphenBetweenWords)
        range[0] += token.line.indexOf(token.content)
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
      if (dashBetweenWords.test(token.content)) {
        const range = rangeFromRegExp(token.content, dashBetweenWords)
        range[0] += token.line.indexOf(token.content)
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
      if (regularSpaceAfterDigit.test(token.content)) {
        const range = rangeFromRegExp(token.content, regularSpaceAfterDigit)
        range[0] += token.line.indexOf(token.content)
        const fixInfo = {
          editColumn: range[0] + 1,
          deleteCount: 1,
          insertText: ' '
        }
        addError(
          onError,
          token.lineNumber,
          'regular space between digit and letter',
          null,
          range,
          fixInfo
        )
      }
      if (noNonBreakingSpaceBeforePercent.test(token.content)) {
        const range = rangeFromRegExp(token.content, noNonBreakingSpaceBeforePercent)
        range[0] += token.line.indexOf(token.content)
        const fixInfo = {
          editColumn: range[0] + 1,
          deleteCount: 3,
          insertText: ' %'
        }
        addError(
          onError,
          token.lineNumber,
          'space or non-space before percent sign',
          null,
          range,
          fixInfo
        )
      }
    })
  }
}
