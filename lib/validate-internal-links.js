// @ts-check

'use strict'

const path = require('path')
const fs = require('fs')
const findExternalAnchors = require('./validate-internal-links-tools/find-etxrenal-anchors')
const findAnchorInIncludes = require('./validate-internal-links-tools/includes_map/analyzer')
const resolvedLink = require('./validate-internal-links-tools/link-resolver')
const {
  addError,
  forEachInlineChild
} = require('markdownlint-rule-helpers')

const urlCheck = /^http/

module.exports = {
  names: ['validate-internal-links'],
  description: 'Broken link',
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#validate-internal-links'),
  tags: ['internal', 'local', 'links'],
  function: function validateInternalLinks (params, onError) {
    const refs = new Set()
    const base = path.normalize(params.name)
    const dir = path.dirname(base)
    const cwd = path.normalize(process.cwd().toString())
    const src = String(params.config.src || './src/')
    const project = params.config.project
    const srcDir = path.resolve(cwd, src)
    findExternalAnchors(base, refs)

    forEachInlineChild(params, 'link_open', async function forToken (token) {
      const originalLink = decodeURIComponent(token.attrs[0][1])
      if (!urlCheck.test(originalLink) && originalLink !== '') {
        const link = resolvedLink(originalLink, base, dir, project, srcDir)
        const file = link.split('#')[0]
        const anchor = link.split('#')[1]
        if (!refs.has(link)) {
          if (file === base) {
            addError(onError, token.lineNumber, 'invalid local anchor', originalLink)
          } else {
            if (fs.existsSync(file)) {
              if (anchor) {
                findExternalAnchors(file, refs)
                const includesMapPath = process.env.PWD + '/includes_map.json'
                if (fs.existsSync(includesMapPath)) {
                  const map = require(includesMapPath)
                  findAnchorInIncludes(file, anchor, refs, map)
                }
                if (!refs.has(link)) {
                  addError(onError, token.lineNumber, 'file exists, but invalid anchor', originalLink)
                }
              }
            } else {
              addError(onError, token.lineNumber, 'file does not exist', originalLink)
            }
          }
        }
      }
    })

    forEachInlineChild(params, 'image', async function forToken (token) {
      const originalLink = decodeURIComponent(token.attrs[0][1])
      if (!urlCheck.test(originalLink) && originalLink !== '') {
        const link = resolvedLink(originalLink, base, dir)
        if (!fs.existsSync(link)) {
          addError(onError, token.lineNumber, 'image does not exist', originalLink)
        }
      }
    })
  }
}
