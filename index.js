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
        describe: 'File(s) to transform',
        demandOption: true,
        requiresArg: true,
        array: true
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
      overwrite: {
        alias: 'ow',
        desc: 'Overwrite the source file',
        type: 'boolean'
      }
    })
    .help(),
  fs = require('fs')

main()

function main() {
  const { file, _: [cmd] } = argv
  file.forEach(f => {
    fs.readFile(f, 'utf8', (err, data) => {
      if (err) return console.error(err.message)
      let json
      try {
        json = JSON.parse(data)
      } catch(e) {
        return console.error(`j18n could not parse the JSON in ${f}\n`, e)
      }
      const { output, suffix, overwrite } = argv
      let transformedJson = {},
        outputFilename = output || getSaveToFilename(f, suffix || cmd, overwrite)
      if (cmd === 'nest') {
        transformedJson = nest(json)
      } else if (cmd === 'flat') {
        transformedJson = flat(json)
      }
      fs.writeFile(outputFilename, JSON.stringify(transformedJson, null, 2), err => {
        return err
          ? console.error(err)
          : console.log('Data written successfully!')
      })
    })
  })
}
