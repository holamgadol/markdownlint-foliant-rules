// @ts-check

'use strict'
const FoliantSlug = require('./foliant-slugger.js')
const anchorTags = /<anchor>(.*?)<\/anchor>/

const slugs = new FoliantSlug()

const { addError } = require('markdownlint-rule-helpers')
const { filterByTypes } = require('markdownlint-rule-helpers/micromark')
module.exports = {
  names: ['find-anchors'],
  description: 'Found anchors: ',
  tags: ['test'],
  parser: 'micromark',
  function: function findAnchors (params, onError) {
    slugs.reset()
    const headings = filterByTypes(params.parsers.micromark.tokens, ['atxHeadingText'])
    headings.forEach(heading => {
      const line = heading.text
      const trimmedLine = line.replace(/^[\s#]*/, '').trim()
      const ref = slugs.slug(trimmedLine)
      addError(onError, heading.startLine, ref.toString())
    })
    const textTokens = filterByTypes(params.parsers.micromark.tokens, ['content'])
    textTokens.forEach(token => {
      if (anchorTags.test(token.text)) {
        const ref = anchorTags.exec(token.text)['1']
        addError(onError, token.startLine, ref.toString())
      }
    })
  }
}
