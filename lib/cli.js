var fs = require('fs')
var path = require('path')
var program = require('commander')
var Comb = require('csscomb')
var parse = require('./parser')
var Process = require('./process')

program.option('-e, --htmlext [ext]', 'for example `html` `html,vue`')
  .parse(process.argv)

if (!program.args.length) {
  console.log('No input paths specified')
  program.help()
}

var comb = new Comb()

var config =  Comb.getCustomConfig(Comb.getCustomConfigPath())

if (!config) {
  console.log('Configuration file ' + configPath + ' was not found.')
  process.exit(1)
}

console.time('spent')
comb.configure(config)
const pro = new Process(comb)
program.args.forEach(p => pro.path(p))
console.timeEnd('spent')
