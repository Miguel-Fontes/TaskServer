describe('Tasks module', function () {
  var tasksModule = require('./../../src/tasks/tasks.js')
  var expect = require('chai').expect
  var dbMock = require('./../mocks/database.mock')
  
  var tasks

  it('should define a build api', function (done) {
    expect(tasksModule.build).not.to.be.undefined
    done()
  })

  it('should build with sucess', function (done) {
    tasks = tasksModule.build(dbMock)
    expect(tasks).not.to.be.undefined
    done()
  })

  it('should define a initialize api', function (done) {
    expect(tasks.initialize).not.to.be.undefined
    done()
  })

  it('should initialize with sucess', function (done) {
    tasks.initialize(function (err, tasks) {
      expect(err).to.be.null
      done()
    })
  })
  
  it('should specify a api to get the routes object', function (done) {
    expect(tasks.routes).not.to.be.undefined
    done()
  })
  
  it('should return a routes object', function (done) {
    expect(tasks.routes()).not.to.be.undefined
    done()
  })

})
