const test = require('ava')

const FoliantSlug = require('../lib/validate-internal-links-tools/foliant-slugger')

const slugs = new FoliantSlug()
slugs.reset()

test('simple heading', t => {
  t.deepEqual(slugs.slug('Heading'), ['heading'])
})

test('repeated simple heading', t => {
  t.deepEqual(slugs.slug('Heading'), ['heading_1'])
})

test('repeated twice simple heading', t => {
  t.deepEqual(slugs.slug('Heading'), ['heading_2'])
})

test('simple heading after reset', t => {
  slugs.reset()
  t.deepEqual(slugs.slug('Heading'), ['heading'])
})

test('repeated simple heading after reset', t => {
  t.deepEqual(slugs.slug('Heading'), ['heading_1'])
})

test('simple heading with customID', t => {
  t.deepEqual(slugs.slug('Heading {#anchor}').sort(), ['heading', 'anchor'].sort())
})

test('long heading', t => {
  t.deepEqual(slugs.slug('Heading with a lot of words'), ['heading-with-a-lot-of-words'])
})

test('long heading with customID', t => {
  t.deepEqual(slugs.slug('Heading with a lot of words {#anchor}').sort(), ['heading-with-a-lot-of-words', 'anchor'].sort())
})

test('long heading with customID and space after it', t => {
  t.deepEqual(slugs.slug('Heading with space after the {#anchor} ').sort(), ['heading-with-space-after-the', 'anchor'].sort())
})

test('cyrillic long heading with customID', t => {
  t.deepEqual(slugs.slug('Длинный заголовок из нескольких слов {#длинный}').sort(), ['длинный-заголовок-из-нескольких-слов', 'длинный'].sort())
})
