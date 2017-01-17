describe('DB configuration Module', () => {
  var dbinit = require('../src/db/dbinit')
  var expect = require('chai').expect
  var config = require('../app.conf.js')

  it('should create and return the configured DB instance to DSV (' + config.env.dsv.db.toUpperCase() + ')', function (done) {
    var env = 'dsv',
    envdb = config.env[env].db
    
    dbinit(env, config, function (err, db) {
      expect(err).to.be.null
      expect(db).not.to.be.undefined
      expect(db.constructor.toString()).to.contain(config.db[envdb].dbClassName)
      done()
    })
  })
  it('should create and return the configured DB instance to HMG (' + config.env.hmg.db.toUpperCase() + ')', function (done) {
    var env = 'hmg',
    envdb = config.env[env].db

    dbinit(env, config, function (err, db) {
      expect(err).to.be.null
      expect(db).not.to.be.undefined
      expect(db.constructor.toString()).to.contain(config.db[envdb].dbClassName)
      done()
    })
  })

  it('should create and return the configured DB instance to PRD (' + config.env.prd.db.toUpperCase() + ')', function (done) {
    var env = 'prd',
    envdb = config.env[env].db

    dbinit(env, config, function (err, db) {
      expect(err).to.be.null
      expect(db).not.to.be.undefined
      expect(db.constructor.toString()).to.contain(config.db[envdb].dbClassName)
      done()
    })
  })

})
