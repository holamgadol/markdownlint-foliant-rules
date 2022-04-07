const regex = require('./slugger-regex.js')

module.exports = FoliantSlug

const own = Object.hasOwnProperty

function FoliantSlug () {
  const self = this

  if (!(self instanceof FoliantSlug)) return new FoliantSlug()

  self.reset()
}

/**
 * Generate a unique slug.
 * @param  {string} value String of text to slugify
 * @return {string}       A unique slug string
 */
FoliantSlug.prototype.slug = function (value) {
  const self = this
  let slug = slugger(value)
  const originalSlug = slug

  while (own.call(self.occurrences, slug)) {
    self.occurrences[originalSlug]++
    slug = [originalSlug + '_' + self.occurrences[originalSlug]]
  }

  self.occurrences[slug] = 0

  return slug
}

/**
 * Reset - Forget all previous slugs
 * @return void
 */
FoliantSlug.prototype.reset = function () {
  this.occurrences = Object.create(null)
}

function slugger (string) {
  const findCustomID = /^(.*?){#([^}]*)}\s*$/

  if (typeof string !== 'string') return ''

  let found
  const idArray = new Array(0)

  while ((found = findCustomID.exec(string)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (found.index === findCustomID.lastIndex) {
      findCustomID.lastIndex++
    }

    string = found[1].trim()
    const customLink = found[2]
    idArray.push(customLink)
  }
  string = string.toLowerCase()
  idArray.push(string.replace(regex, '').replace(/ /g, '-'))
  return idArray
}

FoliantSlug.slug = slugger
