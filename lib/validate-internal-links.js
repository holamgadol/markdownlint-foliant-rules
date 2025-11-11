// @ts-check

'use strict'

const path = require('path')
const fs = require('fs')
const findExternalAnchors = require('./validate-internal-links-tools/find-etxrenal-anchors')
const findAnchorInMap = require('./validate-internal-links-tools/includes_map/analyzer')
const resolvedLink = require('./validate-internal-links-tools/link-resolver')
const { addError, isBlankLine } = require('markdownlint-rule-helpers')
const { filterByTypes } = require('markdownlint-rule-helpers/micromark')

const urlCheck = /^http/
const admonitionCheck = /\s*((!!!)|(\?\?\?\+)|(\?\?\?)) /
const tabCheck = /\s*=== /

module.exports = {
  names: ['validate-internal-links'],
  description: 'Broken link',
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#validate-internal-links'),
  tags: ['internal', 'local', 'links'],
  asynchronous: true,
  parser: 'micromark',
  function: async function validateInternalLinks (params, onError) {
    const refs = new Set()
    const base = path.normalize(params.name)
    const dir = path.dirname(base)
    const cwd = path.normalize(process.cwd().toString())
    const src = String(params.config.src || './src/')
    const project = params.config.project
    const srcDir = path.resolve(cwd, src)
    const workingDir = params.config.workingDir || cwd
    const includesMapPath = path.resolve(workingDir, String(params.config.includesMap || './includes_map.json'))
    const anchorsMapPath = path.resolve(workingDir, String(params.config.anchorsMap || './anchors_map.json'))
    const { lines } = params
    const mdlint = await import('markdownlint/promise')
    await findExternalAnchors(base, refs)

    const links = filterByTypes(params.parsers.micromark.tokens, ['link'])
    for (const token of links) {
      const originalLink = decodeURIComponent(token.text.match(/\(([^)]*)\)/)[1])
      if (!urlCheck.test(originalLink) && originalLink !== '') {
        const link = resolvedLink(originalLink, base, dir, project, srcDir)
        const file = link.split('#')[0]
        const anchor = link.split('#')[1]

        if (originalLink.includes('#') && originalLink.endsWith('/')) {
          addError(onError, token.startLine, 'trailing slash in anchor', originalLink)
        }

        if (fs.existsSync(includesMapPath)) {
          const includesMap = require(includesMapPath)
          findAnchorInMap(workingDir, file, anchor, refs, includesMap)
        }

        if (fs.existsSync(anchorsMapPath)) {
          const anchorsMap = require(anchorsMapPath)
          findAnchorInMap(workingDir, file, anchor, refs, anchorsMap)
        }

        if (!refs.has(link)) {
          if (file === base) {
            addError(onError, token.startLine, 'invalid local anchor', originalLink)
          } else {
            if (fs.existsSync(file)) {
              if (anchor) {
                await findExternalAnchors(file, refs)
                if (!refs.has(link)) {
                  addError(onError, token.startLine, 'file exists, but invalid anchor', originalLink)
                }
              }
            } else {
              addError(onError, token.startLine, 'file does not exist', originalLink)
            }
          }
        }
      }
    };
    const codeTokens = filterByTypes(params.parsers.micromark.tokens, ['codeIndented'])
    for (const token of codeTokens) {
      const lineNumber = token.startLine
      let aboveText = ''
      let i = lineNumber - 2
      while (isBlankLine(lines[i]) && i >= 0) {
        i -= 1
      }
      aboveText = lines[i]
      if (admonitionCheck.test(aboveText) || tabCheck.test(aboveText)) {
        const titleIndent = aboveText.match(/^ */)[0].length
        const contentIndent = new RegExp('^ {' + String(titleIndent + 4) + '}', 'gm')
        const admonitionContent = token.text.replace(contentIndent, '')
        const lintOptions = {
          config: { default: false, 'validate-internal-links': params.config },
          customRules: [{
            names: ['validate-internal-links'],
            description: this.description,
            information: this.information,
            tags: this.tags,
            asynchronous: this.asynchronous,
            parser: this.parser,
            function: this.function
          }],
          handleRuleFailures: true,
          strings: { [params.name]: admonitionContent }
        }
        const res = await mdlint.lint(lintOptions)
        res[params.name].forEach(errorItem => {
          addError(
            onError,
            token.startLine + errorItem.lineNumber - 1,
            errorItem.errorDetail
          )
        })
      }
    }

    const imageTokens = filterByTypes(params.parsers.micromark.tokens, ['image'])
    imageTokens.forEach(token => {
      const originalLink = decodeURIComponent(token.text.match(/\(([^)]*)\)/)[1])
      if (!urlCheck.test(originalLink) && originalLink !== '') {
        const link = resolvedLink(originalLink, base, dir)
        if (!fs.existsSync(link)) {
          addError(onError, token.startLine, 'image does not exist', originalLink)
        }
      }
    })
  }
}
