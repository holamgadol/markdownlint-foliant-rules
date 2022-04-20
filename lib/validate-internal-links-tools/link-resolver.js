const path = require('path')

const resolvedLink = function (originalLink, base, dir, project = undefined, srcDir) {
  let link = originalLink
  // Local links like `#heading`
  if (originalLink.charAt(0) === '#') {
    link = base + originalLink

    // Local links like `./#heading`
  } else if (originalLink.startsWith('./#')) {
    originalLink = originalLink.substring(2)
    link = base + originalLink
  } else {
    // Local MkDocs paths
    const fileExtension = /\.[A-Za-z]+/
    if (!originalLink.match(fileExtension)) {
      let ghostBase = base
      if (originalLink.startsWith('../')) {
        ghostBase = path.join(dir, '/.ghostdir')
      } else if (originalLink.startsWith('/')) {
        const probableProject = originalLink.split('/')[1]
        if (probableProject === project) {
          link = path.normalize(originalLink.replace('/' + probableProject, srcDir))
        } else if (base.split(path.sep).includes(probableProject) && project === undefined) {
          const src = srcDir.replace(/\/+$/, '').toString().split(path.sep).slice(-1)[0]
          const regex = new RegExp('^.*(/|\\\\)' + probableProject + '(/|\\\\)' + src)
          if (base.match(regex)) {
            link = path.normalize(originalLink.replace('/' + probableProject, base.match(regex)[0]))
          }
        }
      } else {
        ghostBase = base.split('.')[0]
      }
      let anchor = ''
      const splitPath = link.split('#')

      if (splitPath[1]) {
        anchor = '#' + splitPath[1]
      }
      link = splitPath[0].replace(/\/+$/, '') + '.md' + anchor
      link = path.resolve(ghostBase, link)
    } else {
      // Another links like `readme.md`.
      link = path.resolve(dir, originalLink)
    }
  }
  link = link.replace('/#', '#')
  return link
}

module.exports = resolvedLink
