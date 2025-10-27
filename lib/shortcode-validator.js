// @ts-check
const { addError } = require('markdownlint-rule-helpers')

module.exports = {
  names: ['shortcode-validator'],
  description: 'Validates paired Hugo shortcodes',
  information: new URL('https://github.com/holamgadol/markdownlint-foliant-rules#shortcode-validator'),
  tags: ['validation'],
  function: function validateShortcodes (params, onError) {
    const { lines, config } = params
    const pairedShortcodes = config?.pairedShortcodes || []
    const PAIRED_SHORTCODES = new Set([
      'section', 'accordion', 'highlight', 'wrap',
      ...pairedShortcodes
    ])

    const stack = []

    lines.forEach((line, lineIndex) => {
      const lineNumber = lineIndex + 1

      // Process opening tags
      /* eslint-disable no-useless-escape */
      const openingRegex = /\{\{(<|%)\s*([^\s>%\/]+)(?:\s+[^>%]*)(?<!\/)[>%]\}\}/g
      /* eslint-enable no-useless-escape */
      let openingMatch
      while ((openingMatch = openingRegex.exec(line)) !== null) {
        const [, type, name] = openingMatch
        if (PAIRED_SHORTCODES.has(name)) {
          stack.push({
            name,
            type,
            lineNumber,
            lineText: line
          })
        }
      }

      // Process closing tags
      const closingRegex = /\{\{(<|%)\s*\/([^\s>%]+)(?:\s+[^>%]*)?[>%]\}\}/g
      let closingMatch
      while ((closingMatch = closingRegex.exec(line)) !== null) {
        const [fullMatch, closingType, name] = closingMatch
        const lastOpened = stack[stack.length - 1]

        if (lastOpened?.name === name) {
          if (lastOpened.type !== closingType) {
            addError(onError, lineNumber,
              `Mismatched closing syntax for '${name}' (expected {{${lastOpened.type}...}} but got {{${closingType}...}})`,
              line
            )
          }
          stack.pop()
        } else if (PAIRED_SHORTCODES.has(name)) {
          addError(onError, lineNumber,
            `Orphaned closing tag: ${fullMatch}`,
            line
          )
        }
      }
    })

    // Report unclosed tags
    stack.forEach(({ name, type, lineNumber, lineText }) => {
      addError(onError, lineNumber,
        `Missing closing tag for {{${type} ${name}${type === '<' ? '>' : '%'}}}`,
        lineText
      )
    })
  }
}
