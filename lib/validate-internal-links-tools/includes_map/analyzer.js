const path = require('path')

const findAnchorInIncludes = function (workingDir, filepath, anchor, refSet, map) {
  for (let i = 0; i < map.length; i++) {
    if (path.resolve(workingDir, String(map[i].file)) === filepath) {
      if (map[i].anchors !== undefined) {
        if (map[i].anchors.includes(anchor)) {
          refSet.add(filepath + '#' + anchor)
        }
      }
    }
  }
}

module.exports = findAnchorInIncludes
