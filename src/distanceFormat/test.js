// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import distanceFormat from '.'

describe('distanceFormat', function() {
  it('takes in every option', function() {
    var result = distanceFormat(
      new Date(2013, 8, 1, 11, 20, 30, 400),
      new Date(2014, 9, 2, 12, 40, 40, 600)
    )
    assert.deepEqual(
      result,
      '1 year 1 month 1 day 1 hour 20 minutes 10 seconds 200 milliseconds'
    )
  })
  it('test', function() {
    var result = distanceFormat(
      new Date(2013, 8, 1, 11, 20, 30, 400),
      new Date(2014, 9, 2, 12, 40, 40, 600),
      ['year', 'month', 'days', 'hours', 'minutes', 'seconds', 'milliseconds']
    )
    assert.deepEqual(
      result,
      '1 year 1 month 1 day 1 hour 20 minutes 10 seconds 200 milliseconds'
    )
  })
})
