const test = require('ava')

const resolvedLink = require('../lib/validate-internal-links-tools/link-resolver')
const path = require('path')

test('relative link in MKDocs style like "../../document"', t => {
  const originalLink = '../../document'
  const base = '/root/foliant-project/src/foo/article.md'
  const dir = path.dirname(base)
  const project = 'another-project'
  const srcDir = '/root/foliant-project/sources/'
  const expectedLink = '/root/foliant-project/src/document.md'
  t.is(resolvedLink(originalLink, base, dir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, undefined, srcDir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project, srcDir), expectedLink)
})

test('relative link in common style like "../document.md"', t => {
  const originalLink = '../document.md'
  const base = '/root/foliant-project/src/foo/article.md'
  const dir = path.dirname(base)
  const project = 'another-project'
  const srcDir = '/root/foliant-project/sources/'
  const expectedLink = '/root/foliant-project/src/document.md'
  t.is(resolvedLink(originalLink, base, dir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, undefined, srcDir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project, srcDir), expectedLink)
})

test('absolute link in MkDocs style like "/foliant-project/boo/boo-detailed/#anchor"', t => {
  const originalLink = '/foliant-project/boo/boo-detailed/#anchor'
  const base = '/root/foliant-project/src/foo/article.md'
  const dir = path.dirname(base)
  const srcDir = '/root/foliant-project/src'
  const expectedLink = '/root/foliant-project/src/boo/boo-detailed.md#anchor'
  t.is(resolvedLink(originalLink, base, dir, undefined, srcDir), expectedLink)
})

test('absolute link with specifying project in MkDocs style like "/foliant-project/boo/boo-detailed/#anchor"', t => {
  const originalLink = '/foliant-project/foliant-project/foliant-project/#anchor'
  const base = '/root/foliant-project/src/foo/article.md'
  const dir = path.dirname(base)
  const project = 'foliant-project'
  const srcDir = '/root/foliant-project/src'
  const expectedLink = '/root/foliant-project/src/foliant-project/foliant-project.md#anchor'
  t.is(resolvedLink(originalLink, base, dir, project, srcDir), expectedLink)
})

test('absolute link in MkDocs style to another-project like "/another-project/boo/boo-detailed/#anchor"', t => {
  const originalLink = '/another-project/boo/boo-detailed/#anchor'
  const base = '/root/foliant-project/src/foo/article.md'
  const dir = path.dirname(base)
  const srcDir = '/root/foliant-project/src/'
  const expectedLink = '/another-project/boo/boo-detailed.md#anchor'
  t.is(resolvedLink(originalLink, base, dir, undefined, srcDir), expectedLink)
})

test('absolute link in MkDocs style to another-project with specifying project like "/another-project/boo/boo-detailed/#anchor"', t => {
  const originalLink = '/another-project/boo/boo-detailed/#anchor'
  const base = '/root/foliant-project/src/foo/article.md'
  const dir = path.dirname(base)
  const project = 'another-project'
  const srcDir = '/root/foliant-project/src/'
  const expectedLink = '/root/foliant-project/src/boo/boo-detailed.md#anchor'
  t.is(resolvedLink(originalLink, base, dir, project, srcDir), expectedLink)
})

test('absolute link in MkDocs style to another-project with specifying project and src like "/another-project/boo/boo-detailed/#anchor"', t => {
  const originalLink = '/another-project/boo/boo-detailed/#anchor'
  const base = '/root/foliant-project/sources/foo/article.md'
  const dir = path.dirname(base)
  const project = 'another-project'
  const srcDir = '/root/foliant-project/sources/'
  const expectedLink = '/root/foliant-project/sources/boo/boo-detailed.md#anchor'
  t.is(resolvedLink(originalLink, base, dir, project, srcDir), expectedLink)
})

test('local anchor like "#anchor"', t => {
  const originalLink = '#anchor'
  const base = '/root/foliant-project/src/foo/article.md'
  const dir = path.dirname(base)
  const project = 'another-project'
  const srcDir = '/root/foliant-project/sources/'
  const expectedLink = '/root/foliant-project/src/foo/article.md#anchor'
  t.is(resolvedLink(originalLink, base, dir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, undefined, srcDir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project, srcDir), expectedLink)
})

test('local anchor like "anchor"', t => {
  const originalLink = 'anchor'
  const base = '/root/foliant-project/src/foo/article.md'
  const dir = path.dirname(base)
  const project = 'another-project'
  const srcDir = '/root/foliant-project/sources/'
  const expectedLink = '/root/foliant-project/src/foo/article/anchor.md'
  t.is(resolvedLink(originalLink, base, dir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, undefined, srcDir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project, srcDir), expectedLink)
})

test('local anchor with slash like "./#anchor"', t => {
  const originalLink = './#anchor'
  const base = '/root/foliant-project/src/foo/article.md'
  const dir = path.dirname(base)
  const project = 'another-project'
  const srcDir = '/root/foliant-project/sources/'
  const expectedLink = '/root/foliant-project/src/foo/article.md#anchor'
  t.is(resolvedLink(originalLink, base, dir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, undefined, srcDir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project, srcDir), expectedLink)
})

test('link to adjacent file like  "report.md"', t => {
  const originalLink = 'report.md'
  const base = '/root/foliant-project/src/foo/article.md'
  const dir = path.dirname(base)
  const project = 'another-project'
  const srcDir = '/root/foliant-project/sources/'
  const expectedLink = '/root/foliant-project/src/foo/report.md'
  t.is(resolvedLink(originalLink, base, dir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, undefined, srcDir), expectedLink)
  t.is(resolvedLink(originalLink, base, dir, project, srcDir), expectedLink)
})
