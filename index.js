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
      },
      'in-place': {
        alias: 'i',
        desc: 'Save file in place',
        type: 'boolean'
      }
    })
    .help(),
  fs = require('fs')

main()

function main() {
  const { file, inPlace, _: [cmd] } = argv
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return console.error(err.message)
    let json
    try {
      json = JSON.parse(data)
    } catch(e) {
      return console.error(`j18n could not parse the JSON in ${file}\n`, e)
    }
    const { output } = argv
    let transformedJson = {},
      outputFilename = output || file
    if (cmd === 'nest') {
      transformedJson = nest(json)
      if(!output) { outputFilename = outputFilename.replace('.flat', '') }
    } else if (cmd === 'flat') {
      transformedJson = flat(json)
      if(!output) {
        outputFilename = outputFilename.split('.')
        outputFilename.splice(outputFilename.length - 1, 0, 'flat')
        outputFilename = outputFilename.join('.')
      }
    }
    fs.writeFile(outputFilename, JSON.stringify(transformedJson, null, 2), err => {
      return err
        ? console.error(err)
        : console.log('Data written successfully!')
    })
  })
}
