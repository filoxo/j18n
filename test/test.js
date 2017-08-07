const assert = require('assert'),
    j18n = require('../index.js'),
    {checkOutput} = require('./utils')

const errMsg = `Usage: node_modules/mocha/bin/_mocha [flat/nest] -f [path]

Options:
  -f, --file  File to transform                                       [required]
  --help      Show help                                                [boolean]

Not enough non-option arguments: got 0, need at least 1`

describe('j18n', () => {
  describe('#nest', () => {
    it('should error if no file', () => {
      const r = checkUsage(() => j18n(['nest']))
      console.log("checkUsage result", r)
      // assert.throws(j18n(['nest']), errMsg)
    });
  });
  describe('#flat', () => {
  });
});