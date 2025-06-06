// @ts-check
const { addError } = require('markdownlint-rule-helpers')

module.exports = {
  names: ['shortcode-validator'],
  description: 'Validates paired Hugo shortcodes',
  tags: ['validation'],
  function: function validateShortcodes(params, onError) {
    const pairedShortcodes = params?.config?.pairedShortcodes || []
    const PAIRED_SHORTCODES = new Set([
      'section',
      'accordion',
      'highlight',
      ...pairedShortcodes
    ])

    const stack = []
    const { lines } = params

    lines.forEach((line, lineIndex) => {
      const lineNumber = lineIndex + 1

      // Match opening tags ({{< name >}} or {{% name %}})
      /* eslint-disable no-useless-escape */
      const openingTags = line.matchAll(/\{\{(<|%)\s*([^\s>%\/]+)(?![^>%]*[%>]\/)[^>%]*[>%]\}\}/g)
      /* eslint-enable no-useless-escape */
      for (const match of openingTags) {
        const type = match[1]
        const name = match[2]
        if (PAIRED_SHORTCODES.has(name)) {
          stack.push({ name, line: lineNumber, type })
        }
      }

      // Match closing tags ({{< /name >}} or {{% /name %}})
      /* eslint-disable no-useless-escape */
      const closingTags = line.matchAll(/\{\{(<|%)\s*\/([^\s>%]+)[^>%]*[>%]\}\}/g)
      /* eslint-enable no-useless-escape */
      for (const match of closingTags) {
        const type = match[1]
        const name = match[2]
        const lastOpened = stack[stack.length - 1]

        if (lastOpened?.name === name && lastOpened.type === type) {
          stack.pop()
        } else if (PAIRED_SHORTCODES.has(name)) {
          addError(
            onError,
            lineNumber,
            `Mismatched closing tag for '{{${type} ${name}${type === '<' ? '>' : '%'}}}'`,
            line.trim()
          )
        }
      }
    })

    // Report unclosed tags
    stack.forEach(({ name, line, type }) => {
      addError(
        onError,
        line,
        `Missing closing tag for '{{${type} ${name}${type === '<' ? '>' : '%'}}}'`
      )
    })
  }
}