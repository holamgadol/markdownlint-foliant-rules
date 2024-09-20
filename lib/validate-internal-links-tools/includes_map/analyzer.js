const path = require('path')
const cwd = path.normalize(process.cwd().toString())

const findAnchorInIncludes = function (filepath, anchor, refSet, map) {
  for (let i = 0; i < map.length; i++) {
    if (path.resolve(cwd, String(map[i].file)) === filepath) {
      if (map[i].anchors !== undefined) {
        if (map[i].anchors.includes(anchor)) {
          refSet.add(filepath + '#' + anchor)
        }
      }
    }
  }
}

module.exports = findAnchorInIncludes
