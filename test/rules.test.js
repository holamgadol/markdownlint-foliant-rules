const test = require('ava').default

const markdownlint = require('markdownlint')
const indentedFence = require('../lib/indented-fence')
const nonLiteralFenceLabel = require('../lib/non-literal-fence-label')
const fencedCodeInQuote = require('../lib/fenced-code-in-quote')
const typograph = require('../lib/typograph')
const validateInternalLinks = require('../lib/validate-internal-links')

test.cb('indented-fence', (t) => {
  t.plan(2)
  const options = {
    files: [
      './test/test-src/indented-fence.md'
    ],
    config: { MD046: false },
    customRules: [indentedFence],
    resultVersion: 0
  }
  markdownlint(options, function callback (err, actualResult) {
    t.falsy(err)
    const expectedResult = {
      './test/test-src/indented-fence.md': {
        'indented-fence': [8, 13, 18]
      }
    }
    // @ts-ignore
    t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
    t.end()
  })
})

test.cb('non-literal-fence-label', (t) => {
  t.plan(2)
  const options = {
    files: [
      './test/test-src/non-literal-fence-label.md'
    ],
    config: { default: true },
    customRules: [nonLiteralFenceLabel],
    resultVersion: 0
  }
  markdownlint(options, function callback (err, actualResult) {
    t.falsy(err)
    const expectedResult = {
      './test/test-src/non-literal-fence-label.md': {
        'non-literal-fence-label': [3]
      }
    }
    // @ts-ignore
    t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
    t.end()
  })
})

test.cb('fenced-code-in-quote', (t) => {
  t.plan(2)
  const options = {
    files: [
      './test/test-src/fenced-code-in-quote.md'
    ],
    config: { MD046: false },
    customRules: [fencedCodeInQuote],
    resultVersion: 0
  }
  markdownlint(options, function callback (err, actualResult) {
    t.falsy(err)
    const expectedResult = {
      './test/test-src/fenced-code-in-quote.md': {
        'fenced-code-in-quote': [3, 10, 17, 24, 31]
      }
    }
    // @ts-ignore
    t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
    t.end()
  })
})

test.cb('typograph', (t) => {
  t.plan(2)
  const options = {
    files: [
      './test/test-src/typograph.md'
    ],
    config: { default: true },
    customRules: [typograph],
    resultVersion: 1
  }
  markdownlint(options, function callback (err, actualResult) {
    t.falsy(err)
    const expectedResult = {
      './test/test-src/typograph.md': [
        {
          errorContext: null,
          errorDetail: 'hyphen instead of dash',
          errorRange: [6, 5],
          lineNumber: 5,
          ruleAlias: 'typograph',
          ruleDescription: 'typograph error',
          ruleInformation: null,
          ruleName: 'typograph'
        },
        {
          errorContext: null,
          errorDetail: 'dash instead of hyphen',
          errorRange: [5, 3],
          lineNumber: 9,
          ruleAlias: 'typograph',
          ruleDescription: 'typograph error',
          ruleInformation: null,
          ruleName: 'typograph'
        }
      ]
    }
    // @ts-ignore
    t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
    t.end()
  })
})

test.cb('validate-internal-links', (t) => {
  t.plan(2)
  const options = {
    files: [
      './test/test-src/topic-A/validate-internal-links.md'
    ],
    config: {
      default: true,
      MD042: false
    },
    customRules: [validateInternalLinks],
    resultVersion: 0
  }
  markdownlint(options, function callback (err, actualResult) {
    t.falsy(err)
    const expectedResult = {
      './test/test-src/topic-A/validate-internal-links.md': {
        'validate-internal-links': [31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61]
      }
    }
    // @ts-ignore
    t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
    t.end()
  })
})
