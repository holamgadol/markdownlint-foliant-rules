const path = require('path')

const resolvedLink = function (originalLink, base, dir, project, srcDir) {
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
        ghostBase = dir + '/.ghostdir'
      } else if (originalLink.startsWith('/')) {
        const probableProject = originalLink.split('/')[1]
        if (probableProject === project) {
          link = originalLink.replace(probableProject, srcDir)
        } else if (base.split('/').includes(probableProject) && project === undefined) {
          const src = srcDir.split('/').at(-1)
          const regex = new RegExp('^.*\\/' + probableProject + '\\/' + src)
          if (base.match(regex)) {
            link = originalLink.replace(probableProject, base.match(regex)[0])
          }
        }
      }
      let anchor = ''
      const splitPath = link.split('#')

      if (splitPath[1]) {
        anchor = '#' + splitPath[1]
      }

      if (splitPath[0].endsWith('/')) {
        splitPath[0] = splitPath[0].slice(0, -1)
      }

      link = splitPath[0] + '.md' + anchor
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
