// @ts-check

'use strict'

const path = require('path')
const fs = require('fs')
const findExternalAnchors = require('./validate-internal-links-tools/find-etxrenal-anchors')
const resolvedLink = require('./validate-internal-links-tools/link-resolver')
const { addError, forEachInlineChild } = require('markdownlint-rule-helpers')

const urlCheck = /^http/

module.exports = {
  names: ['validate-internal-links'],
  description: 'Broken local link',
  tags: ['internal', 'local', 'links'],
  function: function validateInternalLinks (params, onError) {
    const refs = new Set()
    const base = params.name
    const dir = path.dirname(base)

    findExternalAnchors(base, refs)

    forEachInlineChild(params, 'link_open', async function forToken (token) {
      const originalLink = decodeURIComponent(token.attrs[0][1])
      if (!urlCheck.test(originalLink) && originalLink !== '') {
        const link = resolvedLink(originalLink, base, dir)
        const file = link.split('#')[0]
        const anchor = link.split('#')[1]
        if (!refs.has(link)) {
          if (file === base) {
            addError(onError, token.lineNumber, originalLink)
          } else {
            if (fs.existsSync(file)) {
              if (anchor) {
                findExternalAnchors(file, refs)
                if (!refs.has(link)) {
                  addError(onError, token.lineNumber, originalLink)
                }
              }
            } else {
              addError(onError, token.lineNumber, originalLink)
            }
          }
        }
      }
    })
  }
}
