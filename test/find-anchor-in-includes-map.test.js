const test = require('ava')

const findAnchorInIncludes = require('../lib/validate-internal-links-tools/includes_map/analyzer')

const refs = new Set()
const file = process.cwd() + '/src/main.md'
const anchor = 'anchor-in-text'
const map = [{ file: 'src/main.md', includes: ['src/included-file.md'], anchors: ['anchor-in-text', 'anchor-customid'] }]

test('find anchors in includes_map.json', t => {
  const items = new Set()
  items.add(process.cwd() + '/src/main.md#anchor-in-text')

  findAnchorInIncludes(file, anchor, refs, map)
  t.deepEqual(refs, items)
})