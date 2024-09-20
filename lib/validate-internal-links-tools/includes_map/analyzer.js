const findAnchorInIncludes = function (filepath, anchor, refSet, map) {
  for (let i = 0; i < map.length; i++) {
    if (process.env.PWD + '/' + map[i].file === filepath) {
      if (map[i].anchors.includes(anchor)) {
        refSet.add(filepath + '#' + anchor)
      }
    }
  }
}

module.exports = findAnchorInIncludes
