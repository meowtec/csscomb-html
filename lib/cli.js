'use strict'

const fs = require('fs')
const path = require('path')
const program = require('commander')
const Comb = require('csscomb')
const parse = require('./parser')
const Process = require('./process')

program.option('-e, --htmlext [ext]', 'for example `html` `html,vue`')
  .parse(process.argv)

if (!program.args.length) {
  console.log('No input paths specified')
  program.help()
}

const comb = new Comb()

const config =  Comb.getCustomConfig(Comb.getCustomConfigPath())

if (!config) {
  console.log('Configuration file ' + configPath + ' was not found.')
  process.exit(1)
}

console.time('spent')
comb.configure(config)
const pro = new Process(comb)
program.args.forEach(p => pro.path(p))
console.timeEnd('spent')
