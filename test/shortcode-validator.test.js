const test = require('ava');
const rule = require('../lib/shortcode-validator')

// Helper function to run the rule with config
const runRule = (content, config = {}) => {
  const errors = [];
  rule.function(
    {
      lines: content.split('\n'),
      name: 'test.md',
      config: config // Pass configuration here
    },
    (error) => errors.push(error)
  );
  return errors;
};

test('Passes with default shortcodes', (t) => {
  const content = '{{< section >}}{{< /section >}}';
  t.is(runRule(content).length, 0);
});

test('Validates custom shortcodes when configured', (t) => {
  const content = '{{< custom >}}';
  const config = { pairedShortcodes: ['custom'] };
  const errors = runRule(content, config);
  t.is(errors.length, 1);
  t.true(errors[0].detail.includes('Missing closing tag'));
});

test('Ignores non-configured shortcodes', (t) => {
  const content = '{{< unknown >}}';
  t.is(runRule(content).length, 0);
});

test('Handles mixed syntax correctly', (t) => {
  const content = `
    {{< section >}}
      {{% highlight %}}content{{% /highlight %}}
      {{< accordion >}}content{{< /accordion >}}
    {{< /section >}}
  `
  const errors = runRule(content)
  t.is(errors.length, 0)
})

test('Detects mismatched closing tags', (t) => {
  const content = `
    {{< section >}}
      {{% highlight %}}content{{% /highlight %}}
      {{% /section %}}  <!-- Mismatched closing tag -->
  `
  const errors = runRule(content)
  t.is(errors.length, 1)
  t.is(errors[0].detail, "Mismatched closing tag for '{{% section %}}'")
})