const assert = require('assert'),
    { checkOutput, lastLine } = require('./utils'),
    { existsSync, readFileSync, unlink } = require('fs'),
    { exec } = require('child_process')

describe('j18n', () => {
  describe('#nest', () => {
    it('should error if no file', (done) => {
      const e = `Missing required argument: file`
      exec('j18n nest', (error, stdout, stderr) => {
        assert.equal(lastLine(stderr), e)
        done()
      })
    })
  });
  describe('#flat', () => {
    it('should error if no file', (done) => {
      const e = `Missing required argument: file`
      exec('j18n flat', (error, stdout, stderr) => {
        assert.equal(lastLine(stderr), e)
        done()
      })
    })

    it('should create flat file', done => {
      const outputFile = 'test/nested.flat.json'
      exec('j18n flat -f test/nested.json', (error, stdout, stderr) => {
        const expected = `{
  "title": "title",
  "user.name": "Test",
  "user.id": "123abc",
  "step.1.desc": "desc",
  "step.1.heading": "heading"
}`
        assert.equal(stdout, 'Data written successfully!\n')
        assert.ok(existsSync(outputFile))
        assert.equal(readFileSync(outputFile, 'utf8'), expected)
        // Cleanup
        unlink(outputFile, done)
      })
    })
  });
});