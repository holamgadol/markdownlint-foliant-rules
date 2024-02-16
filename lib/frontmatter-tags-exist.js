// // @ts-check

'use strict'

const tags = /tags\s*:|tags\s*=|"tags"\s*:/

const { addError } = require('markdownlint-rule-helpers')

module.exports = {
  names: ['frontmatter-tags-exist'],
  description: 'Checking tags into frontmatter',
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#frontmatter-tags-exist'),
  tags: ['frontmatter', 'tags'],
  function: function frontmatterTags (params, onError) {
    const arr = params.frontMatterLines
    const l = params.frontMatterLines.length
    let notPass = true
    let lineNumber = 0
    let detail = 'There is no frontmatter in the document.'
    let fixInfo = {
      editColumn: 0,
      lineNumber: 0,
      insertText: '---\r\ntags: none\r\n---\r\n\n'
    }
    let fixedText = ''
    if (l >= 3) {
      if (arr[0] === '---') {
        fixedText = 'tags: none'
      } else if (arr[0] === '+++') {
        fixedText = 'tags = \'none\''
      } else if (arr[0] === '{') {
        fixedText = ',\n"tags": "none"'
      }
      for (let i = 0; i < l; i++) {
        if (tags.test(arr[i])) {
          notPass = false
          lineNumber = i
        }
      }
      fixInfo = {
        editColumn: 0,
        lineNumber: l - 2,
        insertText: fixedText
      }
      detail = `Frontmatter does not contain tags:\r\n${arr.join('\n')} `
    }
    if (notPass) {
      addError(onError, lineNumber, detail, null, null, fixInfo)
    }
  }
}
