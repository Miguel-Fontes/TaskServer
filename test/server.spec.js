describe('Http server', function () {
  var request = require('supertest')
  var expect = require('chai').expect
  var config = require('../app.conf')

  var srv, server

  server = require('../src/server')

  after(function (done) {
    server.stop()
    done()
  })

  it('should define a build api', function (done) {
    expect(server.build).not.to.be.undefined
    done()
  })

  it('should build', function (done) {
    server = server.build(config.http, function () {done()})
    expect(server.constructor.name).to.be.equal('Server')
    done()
  })

  it('should have configured listener function', function (done) {
    expect(server.getHttp()._events.request.toString()).to.contain('done()')
    done()
  })

  it('should define initialize', function (done) {
    expect(server.initialize).not.to.be.undefined
    done()
  })
  it('should define stop', function (done) {
    expect(server.stop).not.to.be.undefined
    done()
  })
  it('should define server', function (done) {
    expect(server.getHttp).not.to.be.undefined
    done()
  })

  it('should initialize', function (done) {
    server.initialize(function (err, serverInstance) {
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
