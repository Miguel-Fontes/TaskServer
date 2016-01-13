describe('App main module', function () {
  var app = require('../app.js')
  var expect = require('chai').expect

  before(function (done) {
    app.build(function (err, ap) {
      //if (err) trow err
      app = ap
      done()
    })
  })

  after(function (done) {
    app.stop()
    done()
  })

  describe('initialization process', function () {
    it('should define app', function (done) {
      expect(app).to.be.defined
      done()
    })

    it('should define dbconnections', function (done) {
      expect(app.dbconnections).to.be.defined
      done()
    })

    it('should define controllers', function (done) {
      expect(app.controllers).to.be.defined
      done()
    })

    it('should define http', function (done) {
      expect(app.http).to.be.defined
      done()
    })

    it('should define stop ', function (done) {
      expect(app.stop).to.be.defined
      done()
    })

    it('should define env', function (done) {
      expect(app.env).to.be.defined
      done()
    })

    it('should have at least one connection at app.dbconnections', function (done) {
      expect(app.dbconnections).to.have.length.of.at.least(1)
      done()
    })

    it('should have at least one controller at app.controllers ', function (done) {
      expect(app.controllers).to.have.length.of.at.least(1)
      done()
    })

    it('should have at least one http server at app.http', function (done) {
      expect(app.http).to.have.length.of.at.least(1)
      done()
    })
  })
})
