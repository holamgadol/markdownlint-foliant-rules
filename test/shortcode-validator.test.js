const test = require('ava');
const createRule = require('../lib/shortcode-validator');

// Helper to run the rule with options
const runRule = (content, options = {}) => {
  const errors = [];
  const rule = createRule(options); // Initialize rule with options
  rule.function(
    { lines: content.split('\n'), name: 'test.md' },
    (error) => errors.push(error)
  );
  return errors;
};

test('Passes with default shortcodes', (t) => {
  const content = '{{< section >}}{{< /section >}}';
  t.is(runRule(content).length, 0);
});

test('Validates custom shortcodes when provided', (t) => {
  const content = '{{< custom >}}'; // Not in defaults
  const options = { config: {
    pairedShortcodes: ["custom"]
  }};
  const errors = runRule(content, options);
  t.is(errors.length, 1); // Now fails because "custom" is added
});

test('Ignores non-configured shortcodes', (t) => {
  const content = '{{< unknown >}}';
  t.is(runRule(content).length, 0); // Passes (not in defaults or options)
});