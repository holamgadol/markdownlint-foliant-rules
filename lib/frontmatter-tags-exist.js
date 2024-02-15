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
    for (let i = 0; i < l; i++) {
      if (tags.test(arr[i])) {
        notPass = false
        lineNumber = i
      }
    }
    if (notPass) {
      addError(onError, lineNumber, arr.join('\n'))
    }
  }
}
