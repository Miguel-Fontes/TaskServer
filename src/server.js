module.exports = (function () {
  return new Server()

  function Server () {
    var srv = this

    var http = require('http'),
      hostname = '127.0.0.1',
      port = 8080

    var router = require('./router').build()
    var log = require('./log').log

    var db

    var server = http.createServer()

    var env = 'PRD' // Pode ser DEV, HMG ou PRD. Quero DEV in Memory, HMG e PRD com Mongo

    srv.initialize = initialize
    srv.server = server

    function initialize (callback) {
      switch (env) {
        case 'DEV':
          db = require('./db/memdb')
          break
        case 'HMG':
          db = require('./db/mongodb').build({host: '192.168.99.100', schema: 'todonodehmg'})
          break
        case 'PRD':
          db = require('./db/mongodb').build({host: '192.168.99.100', schema: 'todonode'})
          break
      }

      db.initialize(function (status) {
        if (status) {
          var tasksCtrl = require('./taskController').build(log, db)

          server.on('request', handler)

          server.listen(port, hostname, function () {
            console.log('Server running at http://' + hostname + ':' + port)
          })

          callback(true)

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

      })
    }
  }
})()
