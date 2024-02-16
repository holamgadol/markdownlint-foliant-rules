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
    let lineNumber = 1
    let detail = 'There is no frontmatter in the document.'
    let fixInfo = {
      editColumn: 1,
      lineNumber: 1,
      insertText: '---\ntags: none\n---\r\n'
    }
    let fixedText = ''
    if (l >= 3) {
      if (arr[0] === '---') {
        fixedText = 'tags: none'
      } else if (arr[0] === '+++') {
        fixedText = 'tags = \'none\''
      } else if (arr[0] === '{') {
        fixedText = '"tags": "none"'
      }
      for (let i = 0; i < l; i++) {
        if (tags.test(arr[i])) {
          notPass = false
          lineNumber = i
        }
      }
      fixInfo = null
      detail = `Frontmatter does not contain 'tags'. If tags are not required for this document, add into frontmatter:\n${fixedText}\n`
    }
    if (notPass) {
      addError(onError, lineNumber, detail, null, null, fixInfo)
    }
  }
}
