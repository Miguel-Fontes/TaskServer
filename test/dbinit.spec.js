describe('DB configuration Module', () => {
  var dbinit = require('../src/db/dbinit')
  var expect = require('chai').expect

  it('should create and return a MeM instance to DSV', function (done) {
    var env = 'DSV',
      config = {}

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
  it('should create and return a MongoDB instance to HMG', function (done) {
    var env = 'HMG',
      config = {host: '192.168.99.100', schema: 'todonodehmg'}

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

  it('should create and return a MongoDB instance to PRD', function (done) {
    var env = 'PRD',
      config = {host: '192.168.99.100', schema: 'todonodeprd'}

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
