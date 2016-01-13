var assert = require('assert')
var request = require('supertest')
var expect = require('chai').expect
var ctrlMock = require('./mocks/controller.mock.js')
var config = require('../app.conf')

var srv, server

describe('Http server', function () {
  server = require('../src/server')
    .build(config.http)

  after(function (done) {
    server.stop()
    done()
  })

  it('should define initialize', function (done) {
    expect(server.initialize).to.be.defined
    done()
  })
  it('should define stop', function (done) {
    expect(server.stop).to.be.defined
    done()
  })
  it('should define server', function (done) {
    expect(server.getHttp).to.be.defined
    done()
  })

  it('should initialize', function (done) {
    server.initialize(ctrlMock, function (err, serverInstance) {
      srv = request(serverInstance.getHttp)
      done()
    })
  })

  it('should have initialized on host provided at config(' + config.http.hostname + ')', function (done) {
    expect(server.getHttp()._connectionKey).to.contain(config.http.hostname)
    done()
  })

  it('should have initialized on port provided at config(' + config.http.port + ')', function (done) {
    expect(server.getHttp()._connectionKey).to.contain(config.http.port)
    done()
  })
})