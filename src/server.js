module.exports = (function () {
  return {
    build: buildServer
  }

  function buildServer (config, routes) {
    return new Server(config, routes)
  }

  function Server (config, routes) {
    // Requires
    var http = require('http')
    var log = require('./log').log

    var hostname = config.hostname,
      port = config.port,
      server = http.createServer(routes)

    var srv = this

    // Api
    srv.initialize = initialize
    srv.getHttp = getHttp
    srv.stop = stop
    srv.routes = routes

    // Inicialização
    function initialize (callback) {
      server.on('error', function (e) {
        log('Erro!', e)
      })

      server.on('close', function () {
        log(' Stopping server')
      })
      // TODO: Verificar se é útil
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
  }
})()
