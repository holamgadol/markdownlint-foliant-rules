// @ts-check

'use strict'

const closestMatch = require('closest-match')
const { loadYAML, loadApiRefRegistry } = require('./apireferences-check-tools/load-configs')
const { checkString, ensureRoot, ensureNotRoot, toIdSlate, fixRoute, makeProposal } = require('./apireferences-check-tools/string-ops')

const {
  forEachInlineChild,
  addError
} = require('markdownlint-rule-helpers')

module.exports = {
  names: ['apireferences-check'],
  description: 'Invalid APIref',
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#apireferences-check'),
  tags: ['foliant'],
  function: (params, onError) => {
    const configPath = String(params.config.config || '')
    const apireferencesConfig = loadYAML(configPath)
    const apirefregistryPath = String(params.config.apirefregistry || '')
    const apirefregistry = loadApiRefRegistry(apirefregistryPath)
    const prefixes = Object.keys(apireferencesConfig.API).join('|')
    const checkUnknownPrefix = Boolean((params.config.checkunknownprefix === undefined) ? true : params.config.checkunknownprefix)
    const checkNoPrefix = Boolean((params.config.checknoprefix === undefined) ? true : params.config.checknoprefix)
    const checkNoVerb = Boolean((params.config.checknoverb === undefined) ? true : params.config.checknoverb)

    const verbs = 'OPTIONS|GET|HEAD|POST|PUT|DELETE|TRACE|CONNECT|PATCH|LINK|UNLINK'

    const apireferencesFull = new RegExp(`\\s*((?<prefix>[\\w-]+):\\s+)?((?<verb>${verbs})\\s+)?(?<command>[^\`\\n]+)?\\s*`)
    const regexArr = [
      new RegExp(`\\s*((?<prefix>${prefixes}):\\s+)((?<verb>${verbs})\\s+)?(?<command>[^\`\\n]+?)\\s*`)
    ]

    if (checkUnknownPrefix) {
      regexArr.push(new RegExp(`\\s*((?<prefix>[\\w-]+):\\s+)((?<verb>${verbs})\\s+)(?<command>[^\`\\n]+?)\\s*`))
      if (checkNoPrefix) {
        regexArr.push(new RegExp(`\\s*((?<verb>${verbs})\\s+)(?<command>[^\`\\n]+?)\\s*`))
      }

      if (checkNoVerb) {
        regexArr.push(new RegExp(`\\s*((?<prefix>[\\w-]+):\\s+)((?<verb>${verbs})\\s+)?(?<command>(?!.*[\`\\n]).*/.*?)\\s*`))
      }
    }

    const manualAPIs = Array(params.config.manualAPIs || [])[0]

    forEachInlineChild(params, 'code_inline', async function forToken (token) {
      if (checkString(token.content, regexArr)) {
        const range = [token.line.indexOf(token.content) + 1, token.content.length]
        const prefix = apireferencesFull.exec(token.content).groups.prefix
        if (prefix === undefined) {
          addError(onError, token.lineNumber, `No prefix, try from: ${Object.keys(apirefregistry)}`, null, range)
        } else {
          let verb = apireferencesFull.exec(token.content).groups.verb
          if (verb === undefined || manualAPIs.includes(prefix)) {
            verb = ''
          } else {
            verb = `${verb} `
          }
          const command = apireferencesFull.exec(token.content).groups.command ?? ''
          let proposal = ''
          let refs = [`${verb}${command}`]

          if (Object.hasOwn(apirefregistry, prefix)) {
            refs = refs.concat([`${verb}${ensureRoot(command)}`, `${verb}${ensureNotRoot(command)}`])

            if (apireferencesConfig.API[prefix].endpoint_prefix_list !== undefined) {
              apireferencesConfig.API[prefix].endpoint_prefix_list.forEach(endpointPrefix => refs.push(`${verb}${endpointPrefix}/${command}`))
            } else if (apireferencesConfig.API[prefix].endpoint_prefix !== undefined) {
              refs.push(`${verb}${apireferencesConfig.API[prefix].endpoint_prefix}/${command}`)
            }

            if (Array.isArray(apirefregistry[prefix])) {
              if (!refs.some(el => apirefregistry[prefix].includes(toIdSlate(fixRoute(el))))) {
                proposal = makeProposal(refs[0], apirefregistry[prefix])
                const fixInfo = {
                  editColumn: range[0],
                  deleteCount: range[1],
                  insertText: `${prefix}: ${proposal}`
                }
                addError(onError, token.lineNumber, `reference ${refs[0]} is not found in ${prefix}. Maybe ${proposal}`, null, range, fixInfo)
              }
            } else {
              if (!refs.some(el => Object.keys(apirefregistry[prefix]).includes(fixRoute(el)))) {
                proposal = makeProposal(refs[0], apirefregistry[prefix])
                const fixInfo = {
                  editColumn: range[0],
                  deleteCount: range[1],
                  insertText: `${prefix}: ${proposal}`
                }
                addError(onError, token.lineNumber, `reference ${refs[0]} is not found in ${prefix}. Maybe ${proposal}`, null, range, fixInfo)
              }
            }
          } else {
            proposal = closestMatch.closestMatch(prefix, Object.keys(apirefregistry))
            const fixInfo = {
              editColumn: range[0],
              deleteCount: range[1],
              insertText: `${proposal}: ${refs[0]}`
            }
            addError(onError, token.lineNumber, `wrong prefix ${prefix}, try from: ${Object.keys(apirefregistry)}`, null, range, fixInfo)
          }
        }
      }
    })
  }
}
