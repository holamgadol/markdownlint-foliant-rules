const test = require('ava').default
const indentedFence = require('../lib/indented-fence')
const nonLiteralFenceLabel = require('../lib/non-literal-fence-label')
const fencedCodeInQuote = require('../lib/fenced-code-in-quote')
const typograph = require('../lib/typograph')
const validateInternalLinks = require('../lib/validate-internal-links')
const frontmatterTagsExist = require('../lib/frontmatter-tags-exist')

test('indented-fence', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/indented-fence.md'
    ],
    config: { MD046: false },
    customRules: [indentedFence],
    resultVersion: 0
  }
  const expectedResult = {
    './test/test-src/indented-fence.md': {
      'indented-fence': [8, 13, 18]
    }
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
})

test('non-literal-fence-label', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/non-literal-fence-label.md'
    ],
    config: { default: true },
    customRules: [nonLiteralFenceLabel],
    resultVersion: 0
  }
  const expectedResult = {
    './test/test-src/non-literal-fence-label.md': {
      'non-literal-fence-label': [3]
    }
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
})

test('fenced-code-in-quote', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/fenced-code-in-quote.md'
    ],
    config: { MD027: false, MD046: false },
    customRules: [fencedCodeInQuote],
    resultVersion: 0
  }
  const expectedResult = {
    './test/test-src/fenced-code-in-quote.md': {
      'fenced-code-in-quote': [3, 10, 17, 24, 31]
    }
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
})

test('typograph', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/typograph.md'
    ],
    config: {
      default: true,
      MD007: false,
      MD010: false,
      MD046: false
    },
    customRules: [typograph],
    resultVersion: 1
  }
  const expectedResult = {
    './test/test-src/typograph.md': [
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [6, 5],
        lineNumber: 5,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [5, 3],
        lineNumber: 9,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [8, 3],
        lineNumber: 11,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [7, 3],
        lineNumber: 27,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [12, 5],
        lineNumber: 28,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [7, 3],
        lineNumber: 31,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [9, 5],
        lineNumber: 32,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [8, 3],
        lineNumber: 35,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [10, 5],
        lineNumber: 36,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [8, 3],
        lineNumber: 39,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [13, 5],
        lineNumber: 40,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [7, 3],
        lineNumber: 43,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [14, 5],
        lineNumber: 56,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [13, 3],
        lineNumber: 57,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [10, 5],
        lineNumber: 63,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [11, 3],
        lineNumber: 73,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [16, 5],
        lineNumber: 74,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [12, 3],
        lineNumber: 77,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [17, 5],
        lineNumber: 78,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [11, 3],
        lineNumber: 81,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [18, 5],
        lineNumber: 92,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [17, 3],
        lineNumber: 93,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [14, 5],
        lineNumber: 97,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [13, 3],
        lineNumber: 101,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [12, 5],
        lineNumber: 113,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [11, 3],
        lineNumber: 114,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [14, 5],
        lineNumber: 123,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [13, 3],
        lineNumber: 124,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [7, 5],
        lineNumber: 132,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [8, 3],
        lineNumber: 142,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [10, 5],
        lineNumber: 143,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [9, 3],
        lineNumber: 146,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [11, 5],
        lineNumber: 147,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [8, 3],
        lineNumber: 150,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [15, 5],
        lineNumber: 161,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [8, 5],
        lineNumber: 165,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [7, 3],
        lineNumber: 169,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [8, 5],
        lineNumber: 177,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [7, 3],
        lineNumber: 178,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [10, 5],
        lineNumber: 186,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [11, 3],
        lineNumber: 196,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [16, 5],
        lineNumber: 197,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [12, 3],
        lineNumber: 200,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [17, 5],
        lineNumber: 201,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [11, 3],
        lineNumber: 204,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [18, 5],
        lineNumber: 215,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [17, 3],
        lineNumber: 216,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [14, 5],
        lineNumber: 220,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [13, 3],
        lineNumber: 224,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [7, 5],
        lineNumber: 231,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [8, 3],
        lineNumber: 241,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [10, 5],
        lineNumber: 242,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [9, 3],
        lineNumber: 245,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [11, 5],
        lineNumber: 246,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [8, 3],
        lineNumber: 249,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [15, 5],
        lineNumber: 260,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'hyphen instead of dash',
        errorRange: [8, 5],
        lineNumber: 264,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      },
      {
        errorContext: null,
        errorDetail: 'dash instead of hyphen',
        errorRange: [7, 3],
        lineNumber: 268,
        ruleAlias: 'typograph',
        ruleDescription: 'typograph error',
        ruleInformation: 'https://github.com/holamgadol/markdownlint-foliant-rules#typograph',
        ruleName: 'typograph'
      }
    ]
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
})

test('validate-internal-links', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/topic-A/validate-internal-links.md'
    ],
    config: {
      default: true,
      MD007: false,
      MD010: false,
      MD013: false,
      MD033: false,
      MD042: false,
      MD046: false,
      MD051: false,
      MD059: false
    },
    customRules: [validateInternalLinks],
    resultVersion: 0
  }
  const expectedResult = {
    './test/test-src/topic-A/validate-internal-links.md': {
      'validate-internal-links': [47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 91, 93, 95, 113, 114, 118, 121, 123, 126, 129, 136, 143, 154, 155, 158, 159, 162, 169, 174, 189, 200, 210, 220, 221, 224, 225, 228, 235, 240, 251, 261, 271, 272, 275, 276, 279, 286, 291, 301, 311, 312, 315, 316, 319, 326, 331]
    }
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
})

test('validate-internal-links with src', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/topic-A/validate-internal-links.md'
    ],
    config: {
      default: true,
      MD007: false,
      MD010: false,
      MD013: false,
      MD033: false,
      MD042: false,
      MD046: false,
      MD051: false,
      MD059: false,
      'validate-internal-links': {
        src: './test',
        project: 'markdownlint-foliant-rules'
      }
    },
    customRules: [validateInternalLinks],
    resultVersion: 0
  }
  const expectedResult = {
    './test/test-src/topic-A/validate-internal-links.md': {
      'validate-internal-links': [47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 77, 79, 81, 83, 85, 91, 93, 95, 113, 114, 118, 121, 123, 126, 129, 136, 143, 154, 155, 158, 159, 162, 169, 174, 189, 200, 210, 220, 221, 224, 225, 228, 235, 240, 251, 261, 271, 272, 275, 276, 279, 286, 291, 301, 311, 312, 315, 316, 319, 326, 331]
    }
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
})

test('validate-internal-links with src and project', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/topic-A/validate-internal-links.md'
    ],
    config: {
      default: true,
      MD007: false,
      MD010: false,
      MD013: false,
      MD033: false,
      MD042: false,
      MD046: false,
      MD051: false,
      MD059: false,
      'validate-internal-links': {
        src: './test',
        project: 'another-project'
      }
    },
    customRules: [validateInternalLinks],
    resultVersion: 0
  }
  const expectedResult = {
    './test/test-src/topic-A/validate-internal-links.md': {
      'validate-internal-links': [47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 91, 93, 113, 114, 118, 121, 123, 126, 129, 136, 143, 154, 155, 158, 159, 162, 169, 174, 189, 200, 210, 220, 221, 224, 225, 228, 235, 240, 251, 261, 271, 272, 275, 276, 279, 286, 291, 301, 311, 312, 315, 316, 319, 326, 331]
    }
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
})

test('frontmatter-tags-exist with tag, frontmatter yaml', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/frontmatter-tags-exist/yaml-tag-exist.md'
    ],
    config: {
      'frontmatter-tags-exist': true
    },
    customRules: [frontmatterTagsExist],
    resultVersion: 0
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.assert(actualResult, 'One tag, frontmatter in yaml format.')
})

test('frontmatter-tags-exist with tags, frontmatter yaml', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/frontmatter-tags-exist/yaml-tags-exist.md'
    ],
    config: {
      'frontmatter-tags-exist': true
    },
    customRules: [frontmatterTagsExist],
    resultVersion: 0
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.assert(actualResult, 'Several tags, frontmatter in yaml format.')
})

test('frontmatter-tags-exist with tag, frontmatter toml', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/frontmatter-tags-exist/toml-tag-exist.md'
    ],
    config: {
      'frontmatter-tags-exist': true
    },
    customRules: [frontmatterTagsExist],
    resultVersion: 0
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.assert(actualResult, 'One tag, frontmatter in toml format.')
})

test('frontmatter-tags-exist with tags, frontmatter toml', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/frontmatter-tags-exist/toml-tags-exist.md'
    ],
    config: {
      'frontmatter-tags-exist': true
    },
    customRules: [frontmatterTagsExist],
    resultVersion: 0
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.assert(actualResult, 'Several tags, frontmatter in toml format.')
})

test('frontmatter-tags-exist with tag, frontmatter json', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/frontmatter-tags-exist/json-tag-exist.md'
    ],
    config: {
      'frontmatter-tags-exist': true
    },
    customRules: [frontmatterTagsExist],
    resultVersion: 0
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.assert(actualResult, 'One tag, frontmatter in json format.')
})

test('frontmatter-tags-exist with tags, frontmatter json', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/frontmatter-tags-exist/json-tags-exist.md'
    ],
    config: {
      'frontmatter-tags-exist': true
    },
    customRules: [frontmatterTagsExist],
    resultVersion: 0
  }

  const mdlint = await import('markdownlint/promise')
  const actualResult = await mdlint.lint(options)
  t.assert(actualResult, 'Several tags, frontmatter in json format.')
})
