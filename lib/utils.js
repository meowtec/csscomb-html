const path = require('path')

function trimExtDot(ext) {
  return ext.replace(/^\./, '')
}

exports.hasExt = function(fileName, exts) {
  return exts.split(',').map(ext => trimExtDot(ext.trim())).indexOf(trimExtDot(path.extname(fileName))) > -1
}
