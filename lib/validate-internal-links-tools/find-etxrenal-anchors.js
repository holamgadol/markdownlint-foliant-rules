const theRule = require('./find-anchors.js')

async function lint (options) {
  const mdlint = await import('markdownlint/sync')
  const result = mdlint.lint(options)
  return result
}

const findExternalAnchors = async function (file, refSet) {
  const options = {
    files: [file],
    config: require('./empty.json'),
    customRules: [theRule]
  }

  const result = await lint(options)
  Object.values(result)[0].forEach((element) => {
    if (element.ruleDescription === 'Found anchors: ') {
      const refsInHeading = element.errorDetail.split(',')
      refsInHeading.forEach((ref) => {
        refSet.add(file + '#' + ref)
      })
    }
  })
}

module.exports = findExternalAnchors
