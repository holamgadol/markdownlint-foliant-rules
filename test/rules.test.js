const test = require('ava').default
const { promisify } = require('util')

const markdownlint = require('markdownlint')
const indentedFence = require('../lib/indented-fence')
const nonLiteralFenceLabel = require('../lib/non-literal-fence-label')
const fencedCodeInQuote = require('../lib/fenced-code-in-quote')
const typograph = require('../lib/typograph')
const validateInternalLinks = require('../lib/validate-internal-links')

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
  const actualResult = await promisify(markdownlint)(options)
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
  const actualResult = await promisify(markdownlint)(options)
  t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
})

test('fenced-code-in-quote', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/fenced-code-in-quote.md'
    ],
    config: { MD046: false },
    customRules: [fencedCodeInQuote],
    resultVersion: 0
  }
  const expectedResult = {
    './test/test-src/fenced-code-in-quote.md': {
      'fenced-code-in-quote': [3, 10, 17, 24, 31]
    }
  }
  const actualResult = await promisify(markdownlint)(options)
  t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
})

test('typograph', async t => {
  t.plan(1)
  const options = {
    files: [
      './test/test-src/typograph.md'
    ],
    config: { default: true },
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
      }
    ]
  }
  const actualResult = await promisify(markdownlint)(options)
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
      MD042: false,
      MD051: false
    },
    customRules: [validateInternalLinks],
    resultVersion: 0
  }
  const expectedResult = {
    './test/test-src/topic-A/validate-internal-links.md': {
      'validate-internal-links': [39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 77, 79, 81]
    }
  }
  const actualResult = await promisify(markdownlint)(options)
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
      MD042: false,
      MD051: false,
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
      'validate-internal-links': [39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 69, 71, 77, 79, 81]
    }
  }
  const actualResult = await promisify(markdownlint)(options)
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
      MD042: false,
      MD051: false,
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
      'validate-internal-links': [39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 77, 79]
    }
  }
  const actualResult = await promisify(markdownlint)(options)
  t.deepEqual(actualResult, expectedResult, 'Undetected issues.')
})
