describe('Router suite', function () {
  var routerModule = require('./../src/router.js')
  var expect = require('chai').expect

  var request = require('./mocks/request.mock')
  var response = require('./mocks/response.mock')

  var router

  it('should be defined', function (done) {
    expect(routerModule).not.to.be.undefined
    done()
  })

  it('should define a build api', function (done) {
    expect(routerModule.build).not.to.be.undefined
    done()
  })

  it('should build sucessfully', function (done) {
    router = routerModule.build()
    expect(router).not.to.be.undefined
    done()
  })
  it('should define a when api', function (done) {
    expect(router.when).not.to.be.undefined
    done()
  })
  it('should define a end api', function (done) {
    expect(router.end).not.to.be.undefined
    done()
  })
  it('should define a all api', function (done) {
    expect(router.all).not.to.be.undefined
    done()
  })

  describe('all api', function () {
    it('should match GET request to /tasks', function (done) {
      rq = request('GET', '/tasks')
      rs = response(function () {
        console.log('Matches')
      })
      
      router.all('/tasks', rq, rs, function () {
        done()
      })
    })
  })
})
