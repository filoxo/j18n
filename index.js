#!/usr/bin/env node
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
      }
    })
    .help(),
  fs = require('fs')

main()

function main() {
  const { file, _: [cmd] } = argv,
    j = JSON.parse(fs.readFileSync(file, 'utf8'))
  let jt = {},
    o = file
  if (cmd === 'nest') {
    jt = nest(j)
    o = o.replace('.flat', '')
  } else if (cmd === 'flat') {
    jt = flat(j)
    o = o.split('.')
    o.splice(o.length - 1, 0, 'flat')
    o = o.join('.')
  }
  fs.writeFile(o, JSON.stringify(jt, null, 2), err => {
    return err
    ? console.error(err)
    : console.log('Data written successfully!')
  })
}

function nest(data) {
  if (Object(data) !== data || Array.isArray(data)) return data
  const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g
  let res = {}
  for (var p in data) {
    let cur = res,
      prop = '',
      m
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {})
      prop = m[2] || m[1]
    }
    cur[prop] = data[p]
  }
  return res[''] || res
}

function flat(data) {
  let res = {}
  function f(cur, prop) {
    if (Object(cur) !== cur) {
      res[prop] = cur
    } else if (Array.isArray(cur)) {
      for (let i = 0, l = cur.length; i < l; i++)
        f(cur[i], prop + '[' + i + ']')
      if (l == 0) res[prop] = []
    } else {
      var isEmpty = true
      for (var p in cur) {
        isEmpty = false
        f(cur[p], prop ? prop + '.' + p : p)
      }
      if (isEmpty && prop) res[prop] = {}
    }
  }
  f(data, '')
  return res
}
