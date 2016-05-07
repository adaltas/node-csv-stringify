
should = require 'should'
stringify = if process.env.CSV_COV then require '../lib-cov' else require '../src'

describe 'dateFormat', ->

  it 'defaults to formatting as the getTime integer', (next) ->
    stringify [
      {field1: new Date('2016-01-01'), field2: 'val12', field3: 'val13'}
      {field1: 'val21', field2: 'val22', field3: 'val23'}
    ], (err, data) ->
      return next err if err
      data.should.eql '1451606400000,val12,val13\nval21,val22,val23\n'
      next()

  it 'can optionally format to ISO', (next) ->
    stringify [
      {field1: new Date('2016-01-01'), field2: 'val12', field3: 'val13'}
      {field1: 'val21', field2: 'val22', field3: 'val23'}
    ], dateFormat: 'ISO', (err, data) ->
      return next err if err
      data.should.eql '2016-01-01T00:00:00.000Z,val12,val13\nval21,val22,val23\n'
      next()
