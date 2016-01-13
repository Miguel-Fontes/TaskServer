module.exports = (function TaskRouterBuilder () {
  return {
    build: tasksRoutesBuilder
  }

  function tasksRoutesBuilder (ctrl) {
    return new TasksRouter(ctrl)
  }

  function TasksRouter (ctrl) {
    var tasksCtrl = ctrl
    var log = require('../log').log
    var router = require('../router').build()
    var app = this
    
    app.route = route

    function route (request, response) {
      // function handler (request, response) {
      log('------------------------------------------------------------------------------------------------')
      log('Request: METHOD:', request.method, ' - URL:', request.url)
      tasksCtrl.setTransaction(request, response)
      
      router
        .when('POST', '/tasks', request, tasksCtrl.save)
        .when('PUT', '/tasks/:id', request, tasksCtrl.update)
        .when('DELETE', '/tasks/:id', request, tasksCtrl.remove)
        .when('GET', '/tasks/:id', request, tasksCtrl.get)
        .when('GET', '/tasks', request, tasksCtrl.query)
        .when('OPTIONS', '/tasks/:id', request, tasksCtrl.options)
        .when('GET', '/', request, tasksCtrl.forbidden)
        .end()
      log('------------------------------------------------------------------------------------------------')
    }
  }
})()
