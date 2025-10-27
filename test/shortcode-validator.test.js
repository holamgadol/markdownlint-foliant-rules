const test = require('ava')
const rule = require('../lib/shortcode-validator')

// Helper function to run the rule with config
const runRule = (content, config = {}) => {
  const errors = []
  rule.function(
    {
      lines: content.split('\n'),
      name: 'test.md',
      config
    },
    (error) => errors.push(error)
  )
  return errors
}

test('Validates correct paired shortcodes', (t) => {
  const errors = runRule('{{< section >}}{{< /section >}}')
  t.is(errors.length, 0)
})

test('Validates correct self-closed shortcodes', (t) => {
  const errors = runRule('{{< section />}}')
  t.is(errors.length, 0)
})

test('Detects mismatched syntax', (t) => {
  const errors = runRule('{{< section >}}{{% /section %}}')
  t.is(errors.length, 1)
  t.true(errors[0].detail.includes('Mismatched closing syntax'))
})

test('Detects orphaned closing tags', (t) => {
  const errors = runRule('{{< /section >}}')
  t.is(errors.length, 1)
  t.true(errors[0].detail.includes('Orphaned closing tag'))
})

test('Detects missing closing tags', (t) => {
  const errors = runRule('{{% section %}}')
  t.is(errors.length, 1)
  t.true(errors[0].detail.includes('Missing closing tag'))
})

test('Handles custom shortcodes from config', (t) => {
  const errors = runRule('{{< custom >}}', { pairedShortcodes: ['custom'] })
  t.is(errors.length, 1)
})

test('Ignores unconfigured shortcodes', (t) => {
  const errors = runRule('{{< unknown >}}')
  t.is(errors.length, 0)
})
