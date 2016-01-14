describe('Tasks Routes', function () {
  var expect = require('chai').expect
  var tasksCtrl = require('./../mocks/controller.mock')
  var tasksRoutes = require('./../../src/tasks/tasks-router').build(tasksCtrl)
 
  function request (method, path) {
    return {
      method: method,
      url: path
    }
  }

  function response (callback) {
    return {
      end: callback
    }
  }

  it('should be defined', function (done) {
    expect(tasksRoutes).not.to.be.undefined
    done()
  })

  it('should define route', function (done) {
    expect(tasksRoutes.route).not.to.be.undefined
    done()
  })

  it('should be a TasksRouter object', function (done) {
    expect(tasksRoutes.constructor.name).to.contain('TasksRouter')
    done()
  })

  it('should intercept a POST request to /tasks', function (done) {
    tasksRoutes.route(request('POST', '/tasks'), response(function (res) {
      expect(res).to.be.equal('save')
      done()
    }))
  })

  it('should intercept a PUT request to /tasks/1234', function (done) {
    tasksRoutes.route(request('PUT', '/tasks/1234'), response(function (res) {
      expect(res).to.be.equal('update')
      done()
    }))
  })

  it('should intercept a DELETE request to /tasks/1234', function (done) {
    tasksRoutes.route(request('DELETE', '/tasks/1234'), response(function (res) {
      expect(res).to.be.equal('remove')
      done()
    }))
  })

  it('should intercept a GET request to /tasks/1234', function (done) {
    tasksRoutes.route(request('GET', '/tasks/1234'), response(function (res) {
      expect(res).to.be.equal('get')
      done()
    }))
  })

  it('should intercept a GET request to /tasks', function (done) {
    tasksRoutes.route(request('GET', '/tasks'), response(function (res) {
      expect(res).to.be.equal('query')
      done()
    }))
  })

  it('should intercept a OPTIONS request to /tasks/1234', function (done) {
    tasksRoutes.route(request('OPTIONS', '/tasks/1234'), response(function (res) {
      expect(res).to.be.equal('options')
      done()
    }))
  })
  
    it('should intercept a GET request to /', function (done) {
    tasksRoutes.route(request('GET', '/'), response(function (res) {
      expect(res).to.be.equal('forbidden')
      done()
    }))
  })
})
