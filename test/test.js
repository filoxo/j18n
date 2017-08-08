const assert = require('assert'),
    { checkOutput, lastLine } = require('./utils'),
    { exec } = require('child_process')

describe('j18n', () => {
  describe('#nest', () => {
    it('should error if no file', (done) => {
      const e = `Missing required argument: f`
      exec('j18n nest', (error, stdout, stderr) => {
        assert.equal(lastLine(stderr), e)
        done()
      })
    })
  });
  describe('#flat', () => {
    it('should error if no file', (done) => {
      const e = `Missing required argument: f`
      exec('j18n flat', (error, stdout, stderr) => {
        assert.equal(lastLine(stderr), e)
        done()
      })
    })
  });
});