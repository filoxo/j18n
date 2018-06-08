#!/usr/bin/env node
const { nest, flat, getSaveToFilename } = require('./main.js')

const { argv } = require('yargs')
    .usage('Usage: j18n nest -f [file]')
    .command('flat', 'Flatten json key structures')
    .command('nest', 'Nest json key structures')
    .demandCommand(1, 'You must specify flat or nest command')
    .options({
      file: {
        alias: 'f',
        describe: 'File to transform',
        demandOption: true,
        requiresArg: true,
        nargs: 1
      },
      output: {
        alias: 'o',
        desc: 'Output filename',
        requiresArg: true,
        nargs: 1,
        type: 'string'
      },
      suffix: {
        alias: 's',
        desc: 'Outputted filename suffix (eg. file.[suffix].json)',
        requiresArg: true,
        nargs: 1,
        type: 'string'
      }
    })
    .help(),
  fs = require('fs')

main()

function main() {
  const { file, _: [cmd] } = argv
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return console.error(err.message)
    let j
    try {
      j = JSON.parse(data)
    } catch(e) {
      return console.error(`j18n could not parse the JSON in ${file}\n`, e)
    }
    const { output } = argv
    let jt = {},
      o = output || file
    if (cmd === 'nest') {
      jt = nest(j)
      if(!output) { o = o.replace('.flat', '') }
    } else if (cmd === 'flat') {
      jt = flat(j)
      if(!output) {
        o = o.split('.')
        o.splice(o.length - 1, 0, 'flat')
        o = o.join('.')
      }
    }
    fs.writeFile(o, JSON.stringify(jt, null, 2), err => {
      return err
        ? console.error(err)
        : console.log('Data written successfully!')
    })
  })
}

