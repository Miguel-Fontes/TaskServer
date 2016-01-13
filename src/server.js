module.exports = (function () {
  return {
    build: buildServer
  }

  function buildServer (config) {
    return new Server(config)
  }

  function Server (config) {
    // Requires
    var router = require('./router').build()
    var http = require('http')
    var log = require('./log').log

    var tasksCtrl

    var hostname = config.hostname,
      port = config.port,
      server = http.createServer(handler)

    var srv = this

    // Api
    srv.initialize = initialize
    srv.getHttp = getHttp
    srv.stop = stop

    // Inicialização
    function initialize (ctrl, callback) {
      tasksCtrl = ctrl

      server.on('error', function (e) {
        log('Erro!', e)
      })

      server.on('close', function () {
        log(' Stopping server')
      })
      /*   
         process.on('SIGINT', function () {
              server.close()
            })*/

      server.listen(port, hostname, function () {
        log('Server running at http://' + hostname + ':' + port)
        callback(null, srv)
      })
    }

    // Funções
    function getHttp () {
      return server
    }

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
