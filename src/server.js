module.exports = (function () {
  return {
    build: buildServer
  }

  function buildServer (config, ctrl) {
    return new Server(config, ctrl)
  }

  function Server (config, ctrl) {
    // Requires
    var router = require('./router').build()
    var http = require('http')
    var log = require('./log').log

    var tasksCtrl = ctrl

    var hostname = config.hostname,
      port = config.port,
      srv = this,
      server = http.createServer()

    // Api
    srv.initialize = initialize
    srv.server = server
    srv.stop = stop

    // Inicialização
    function initialize (ctrl, callback) {
      server.listen(port, hostname, function () {
        // PASSAR PARA FUNÇAO DE LOG 
        // console.log('Server running at http://' + hostname + ':' + port)
      })

      server.on('request', handler)

      callback(null, srv)
    }

    // Funções
    function stop () {
      server.close()
    }

    function handler (request, response) {
      log('------------------------------------------------------------------------------------------------')
      log('Request: METHOD:', request.method, ' - URL:', request.url)
      tasksCtrl.setTransaction(request, response)

      router
        .when('POST', '/tasks', request, tasksCtrl.save)
        .when('PUT', '/tasks/:id', request, tasksCtrl.update)
        .when('DELETE', '/tasks/:id', request, tasksCtrl.remove)
        .when('GET', '/tasks/:id', request, tasksCtrl.get)
        .when('GET', '/tasks', request, tasksCtrl.getAll)
        .when('OPTIONS', '/tasks/:id', request, tasksCtrl.options)
        .when('GET', '/', request, tasksCtrl.forbidden)
        .end()

      log('------------------------------------------------------------------------------------------------')
    }

  }
})()
