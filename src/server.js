module.exports = (function () {
  return new Server()

  function Server () {
    // Requires
    var router = require('./router').build()
    var log = require('./log').log
    var dbInit = require('./db/dbinit')
    var tasksCtrl = require('./taskController')
    var http = require('http')
    var config = require('../app.conf.js');

    var hostname = config.http.hostname,
      port = config.http.port,
      srv = this,
      server = http.createServer()

    var env = 'hmg' // Pode ser DEV, HMG ou PRD. Quero DEV in Memory, HMG e PRD com Mongo

    // Api
    srv.initialize = initialize
    srv.server = server

    // Inicialização
    function initialize (callback) {
      dbInit(env, config/*, {host: '192.168.99.100', schema: 'todonodehmg'}*/, function (err, db) {
        if (!err) {
          // db = dbase
          tasksCtrl = tasksCtrl.build(log, db)

          server.listen(port, hostname, function () {
            console.log('Server running at http://' + hostname + ':' + port)
          })

          server.on('request', handler)

          callback(true)

        } else {
          callback(false)
          throw new Error('Erro na inicialização do servidor! - ' + err)
        }
      })

      // Funções
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
  }
})()
