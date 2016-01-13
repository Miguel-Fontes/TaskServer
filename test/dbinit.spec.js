describe('DB configuration Module', () => {
  var dbinit = require('../src/db/dbinit')
  var expect = require('chai').expect
  var config = require('../app.conf.js')

  it('should create and return the configured DB instance to DSV', function (done) {
    var env = 'dsv'

    dbinit(env, config, function (err, db) {
      expect(err).to.be.null
      expect(db).not.to.be.undefined
      expect(db.constructor.toString()).to.contain('MeMDatabase')
      expect(db.initialize).to.be.defined
      expect(db.save).to.be.defined
      expect(db.remove).to.be.defined
      expect(db.get).to.be.defined
      expect(db.update).to.be.defined
      done()
    })
  })
  it('should create and return the configured DB instance to HMG', function (done) {
    var env = 'hmg'

    dbinit(env, config, function (err, db) {
      expect(err).to.be.null
      expect(db).not.to.be.undefined
      expect(db.constructor.toString()).to.contain('MongoDB')
      expect(db.initialize).to.be.defined
      expect(db.save).to.be.defined
      expect(db.remove).to.be.defined
      expect(db.get).to.be.defined
      expect(db.update).to.be.defined
      done()
    })
  })

  it('should create and return the configured DB instance to PRD', function (done) {
    var env = 'prd'

    dbinit(env, config, function (err, db) {
      expect(err).to.be.null
      expect(db).not.to.be.undefined
      expect(db.constructor.toString()).to.contain('MongoDB')
      expect(db.initialize).to.be.defined
      expect(db.save).to.be.defined
      expect(db.remove).to.be.defined
      expect(db.get).to.be.defined
      expect(db.update).to.be.defined
      done()
    })
  })

})
