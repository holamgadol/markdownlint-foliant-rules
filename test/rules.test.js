const test = require('ava').default
const { promisify } = require('util')

const markdownlint = require('markdownlint')
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
      MD033: false,
      MD042: false,
      MD051: false
    },
    customRules: [validateInternalLinks],
    resultVersion: 0
  }
  const expectedResult = {
    './test/test-src/topic-A/validate-internal-links.md': {
      'validate-internal-links': [47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 91, 93, 95]
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
      MD033: false,
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
      'validate-internal-links': [47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 77, 79, 81, 83, 85, 91, 93, 95]
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
      MD033: false,
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
      'validate-internal-links': [47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 77, 79, 81, 83, 85, 91, 93]
    }
  }
  const actualResult = await promisify(markdownlint)(options)
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
  const actualResult = await promisify(markdownlint)(options)
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
  const actualResult = await promisify(markdownlint)(options)
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
  const actualResult = await promisify(markdownlint)(options)
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
  const actualResult = await promisify(markdownlint)(options)
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
  const actualResult = await promisify(markdownlint)(options)
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
  const actualResult = await promisify(markdownlint)(options)
  t.assert(actualResult, 'Several tags, frontmatter in json format.')
})
