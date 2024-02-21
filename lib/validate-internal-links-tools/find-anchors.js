// @ts-check

'use strict'
const FoliantSlug = require('./foliant-slugger.js')
const anchorTags = /<anchor>(.*?)<\/anchor>/

const slugs = new FoliantSlug()

const {
  forEachHeading, addError,
  filterTokens
} = require('markdownlint-rule-helpers')
module.exports = {
  names: ['find-anchors'],
  description: 'Found anchors: ',
  tags: ['test'],
  function: function findAnchors (params, onError) {
    slugs.reset()
    forEachHeading(params, (heading) => {
      const { line } = heading
      const trimmedLine = line.replace(/^[\s#]*/, '').trim()
      const ref = slugs.slug(trimmedLine)
      addError(onError, heading.lineNumber, ref.toString())
    }
    )
    filterTokens(params, 'inline', function forToken (token) {
      if (anchorTags.test(token.content)) {
        const ref = anchorTags.exec(token.content)['1']
        addError(onError, token.lineNumber, ref.toString())
      }
    })
  }
}
