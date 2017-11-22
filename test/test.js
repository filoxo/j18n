const assert = require('assert'),
  { checkOutput, lastLine, firstLine } = require('./utils'),
  { existsSync, readFileSync, unlink } = require('fs'),
  { exec } = require('child_process')

describe('j18n', () => {
  describe('#nest', () => {
    it('should error if no file', done => {
      const e = `Missing required argument: file`
      exec('j18n nest', (error, stdout, stderr) => {
        assert.equal(lastLine(stderr), e)
        done()
      })
    })
  })
  describe('#flat', () => {
    it('should error if no file', done => {
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
  })

  describe('#options', () => {
    it('should error if no arg is included with --file', done => {
      const e = `Not enough arguments following: file`
      exec('j18n flat --file', (error, stdout, stderr) => {
        assert.equal(lastLine(stderr), e)
        done()
      })
    })

    it('should error if --file does not exist', done => {
      const e = `ENOENT: no such file or directory, open 'noExist.json'`
      exec('j18n flat --file noExist.json', (error, stdout, stderr) => {
        assert.equal(lastLine(stderr), e)
        done()
      })
    })

    it('should error if --file is unreadable', done => {
      const e = `ENOENT: no such file or directory, open 'noExist.json'`
      exec('j18n flat --file noExist.json', (error, stdout, stderr) => {
        assert.equal(lastLine(stderr), e)
        done()
      })
    })

    it('should error if --file has syntax error', done => {
      const e = `j18n could not parse the JSON in test/badSyntax.json`
      exec('j18n flat --file test/badSyntax.json', (error, stdout, stderr) => {
        assert.equal(firstLine(stderr), e)
        done()
      })
    })

    it('should error if --file json is incomplete', done => {
      const e = `j18n could not parse the JSON in test/badValue.json`
      exec('j18n flat --file test/badValue.json', (error, stdout, stderr) => {
        assert.equal(firstLine(stderr), e)
        done()
      })
    })

    it('should error if no arg is included with --output', done => {
      const e = `Not enough arguments following: output`
      exec(
        'j18n flat --file test/nested.json --output',
        (error, stdout, stderr) => {
          assert.equal(lastLine(stderr), e)
          done()
        }
      )
    })
  })
})
