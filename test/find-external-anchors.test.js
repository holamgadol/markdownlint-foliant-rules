const test = require('ava')

const findExternalAnchors = require('../lib/validate-internal-links-tools/find-etxrenal-anchors')

const refs = new Set()
const testRoot = __dirname

const docPath = '/test-src/find-external-anchors/anchors-source-A.md'

const docAnchors = [
  testRoot + docPath + '#testAnchor',
  testRoot + docPath + '#heading-in-another-document'
].sort()

test.serial('find anchors in doc.md', async t => {
  await findExternalAnchors(testRoot + docPath, refs)
  const items = Array.from(refs).sort()
  t.deepEqual(items, docAnchors)
})

const articlePath = '/test-src/find-external-anchors/anchors-source-B.md'

const articleAnchors = [
  testRoot + articlePath + '#якорь',
  testRoot + articlePath + '#заголовок-на-русском-языке'
].sort()

test.serial('find anchors in article.md', async t => {
  await findExternalAnchors(testRoot + articlePath, refs)
  const items = Array.from(refs).sort()
  t.deepEqual(items, docAnchors.concat(articleAnchors).sort())
})
