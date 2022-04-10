const markdownlint = require('markdownlint')
const theRule = require('./find-anchors.js')

const findExternalAnchors = function (file, refSet) {
  const options = {
    files: [file],
    config: require('./empty.json'),
    customRules: [theRule]
  }

  const result = markdownlint.sync(options)
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
