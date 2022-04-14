const test = require('ava')

const resolvedLink = require('../lib/validate-internal-links-tools/link-resolver')
const path = require('path')

const base = '/root/foliant-project/src/foo/article.md'
const dir = path.dirname(base)
const cwd = process.cwd().toString()
const src = './src/'
const project = undefined
const srcDir = path.resolve(cwd, src)
test('relative link in MKDocs style like "../../document"', t => {
  t.is(resolvedLink('../../document', base, dir, project, srcDir), '/root/foliant-project/src/document.md')
})

test('relative link in common style like "../document.md"', t => {
  t.is(resolvedLink('../document.md', base, dir, project, srcDir), '/root/foliant-project/src/document.md')
})

test('absolute link in MkDocs style like "/foliant-project/boo/boo-detailed/#anchor"', t => {
  t.is(resolvedLink('/foliant-project/boo/boo-detailed/#anchor', base, dir, project, srcDir), '/root/foliant-project/src/boo/boo-detailed.md#anchor')
})

test('local anchor like "#anchor"', t => {
  t.is(resolvedLink('#anchor', base, dir, project, srcDir), '/root/foliant-project/src/foo/article.md#anchor')
})

test('local anchor with slash like "./#anchor"', t => {
  t.is(resolvedLink('./#anchor', base, dir, project, srcDir), '/root/foliant-project/src/foo/article.md#anchor')
})

test('link to adjacent file like  "report.md"', t => {
  t.is(resolvedLink('report.md', base, dir, project, srcDir), '/root/foliant-project/src/foo/report.md')
})
