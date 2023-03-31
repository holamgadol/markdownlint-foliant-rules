// @ts-check

'use strict'

const createHash = require('crypto')
const closestMatch = require('closest-match')

function parameterizeSlate (stringToClean, sep = '-') {
  const htmlEscape = {
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&39;',
    '<': '&lt;',
    '>': '&gt;'
  }

  let parameterizedString = stringToClean.normalize('NFKD').normalize('NFD')
  parameterizedString = parameterizedString
    .split('')
    .map((char) => htmlEscape[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9_]+/g, sep)
    .replace(new RegExp(`^${sep}+|${sep}+$`, 'g'), '')
  return parameterizedString
}

function toIdSlate (input) {
  // removing tags
  let source = input.replace(/<[/\w_:=" ]*>/g, '')
  source = parameterizeSlate(source)
  return source || createHash('sha1').update(input).digest('hex').slice(0, 10)
}

function ensureRoot (route) {
  /* ensure that route starts with forward slash. Also, trim trailing slash. */
  if (route) {
    return '/' + route.trim().replace(/^\/|\/$/g, '')
  }
  return route
}

function fixRoute (route) {
  /* ensure that route starts with forward slash. Also, trim trailing slash. */
  if (route) {
    return route.replace(/\/\//, '/').split('?')[0]
  }
  return route
}

function ensureNotRoot (route) {
  /* ensure that route starts with forward slash. Also, trim trailing slash. */
  if (route) {
    return route.trim().replace(/^\/|\/$/g, '')
  }
  return route
}

function fromIdSlate (idString) {
  const htmlUnescape = {
    '&amp;': '&',
    '&quot;': '"',
    '&39;': '\'',
    '&lt;': '<',
    '&gt;': '>'
  }

  const verbRestore = {
    options: 'OPTIONS ',
    get: 'GET ',
    head: 'HEAD ',
    post: 'POST ',
    put: 'PUT ',
    delete: 'DELETE ',
    trace: 'TRACE ',
    connect: 'CONNECT ',
    patch: 'PATCH ',
    link: 'LINK ',
    unlink: 'UNLINK '
  }

  let output = idString.replace(/^(options|get|head|post|put|delete|trace|connect|patch|link|unlink)/, match => verbRestore[match])
    .split('-')
    .map(word => word.charAt(0) + word.slice(1))
    .join('/')
    .replace(/(&amp;|&quot;|&39;|&lt;|&gt;)/g, match => htmlUnescape[match])
  output = output.normalize('NFC')
  return output
}

function checkString (str, regexArr) {
  for (let i = 0; i < regexArr.length; i++) {
    if (regexArr[i].test(str)) {
      return true
    }
  }
  return false
}

function makeProposal (str, registry) {
  const array = (Array.isArray(registry) ? registry : Object.keys(registry))
  return fromIdSlate(closestMatch.closestMatch(str, array)) + ((str.split('?')[1] !== undefined) ? `?${str.split('?')[1]}` : '')
}

module.exports = {
  ensureRoot,
  ensureNotRoot,
  fixRoute,
  toIdSlate,
  checkString,
  makeProposal
}
