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

function getSaveToFilename(fileName, suffix, inPlace = false) {
  let filename = fileName
  if(!inPlace && suffix) {
    filename = filename.split('.')
    filename.splice(filename.length - 1, 0, suffix)
    filename = filename.join('.') 
  }
  return filename
}

module.exports = {
  nest,
  flat,
  getSaveToFilename
}