'use strict'

var htmlparser = require("htmlparser2")

/*
 * @return Array<{ text: string, startIndex: number, endIndex: number }>
*/
module.exports = function(html, callback) {
  var parser = new htmlparser.Parser({
    inStyleTag: false,
    styles: [],
    onopentag: function(name, attribs){
      if(name === "style"){
        this.inStyleTag = true
      }
    },
    ontext: function(text){
      if (this.inStyleTag) {
        var endSpace = /\s+$/
        var endSpaceLenth = 0
        if (endSpace.test(text)) {
          text = text.replace(endSpace, function(spaces) {
            endSpaceLenth = spaces.length
            return ''
          })
        }
        this.styles.push({
          text: text,
          startIndex: parser.startIndex,
          endIndex: parser.endIndex - endSpaceLenth
        })
      }
    },
    onclosetag: function(tagname){
      if(tagname === "style"){
        this.inStyleTag = false
      }
    },
    onend: function() {
      callback(null, this.styles)
    },
    onerror: callback
  }, {
    decodeEntities: true
  })
  parser.write(html)
  parser.end()
}
