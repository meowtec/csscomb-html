'use strict'

const program = require('commander')
const parse = require('./parser')
const fs = require('fs')
const path = require('path')
const _ = require('./utils')

class Process {

  constructor(comb) {
    this.comb = comb
  }

  string(html, callback){
    const comb = this.comb
    parse(html, (err, styles) => {
      let newHtml = html
      let offset = 0
      styles.forEach((style) => {
        const newStyleText = comb.processString(style.text).replace(/\s+$/, '')
        newHtml = newHtml.slice(0, style.startIndex + offset) + newStyleText + newHtml.slice(style.endIndex + offset + 1)
        offset = offset + newStyleText.length - style.text.length
      })
      callback(newHtml)
    })
  }

  file(p) {
    let html = fs.readFileSync(p, 'utf-8')
    this.string(html, (newHtml) => {
      if (html !== newHtml) {
        fs.writeFileSync(p, newHtml)
        console.warn('\u001b[33mcsscomb:' + p + '\u001b[39m')
      }
    })
  }

  path(p) {
    let ext = program.htmlext || 'html'

    fs.readdirSync(p).forEach((file) => {
      let filePath = path.resolve(p, file)
      let state = fs.statSync(filePath)
      if (state.isDirectory()) {
        this.path(filePath)
      }
      else if (state.isFile() && _.hasExt(file, ext)) {
        this.file(filePath)
      }
    })
  }

}


module.exports = Process
