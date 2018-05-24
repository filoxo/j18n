const assert = require('assert'),
  {getSaveToFilename, nest, flat} = require('../main')


describe('j18n units', () => {
  describe('#getSaveToFilename', () => {
    it('should return the correct output filename', () => {
      assert.equal(getSaveToFilename('test.json', 'nest'), 'test.nest.json')
    })
    it('should not modify filename if saved in place', () => {
      assert.equal(getSaveToFilename('test.json', 'nest', true), 'test.json')
    })
  })

  describe('#nest', () => {
    it('should nest period-delimited keys', () => {
      const src = {
        'a.b.c': 0
      }
      const expected = {
        a: {
          b: {
            c: 0
          }
        }
      }
      assert.deepStrictEqual(nest(src), expected)
    })
  })

  describe('#flat', () => {
    it('should flatten to single period-delimited key', () => {
      const src = {
        a: {
          b: {
            c: 0
          }
        }
      }
      const expected = {
        'a.b.c': 0
      }
      assert.deepStrictEqual(flat(src), expected)
    })
  })
})