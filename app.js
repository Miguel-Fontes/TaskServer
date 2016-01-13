module.exports = (function () {
  return {
    build: buildApp
  }

  function buildApp (callback) {
    return new App(callback)
  }

  function App (callback) {
    var router = require('./src/router').build()
    // var log = require('./src/log').log
    var dbInit = require('./src/db/dbinit')
    var tasksCtrl = require('./src/taskController')
    var config = require('./app.conf')
    var server = require('./src/server').build(config.http)

    // Pode ser DEV, HMG ou PRD. Quero DEV in Memory, HMG e PRD com Mongo
    var env = 'dsv'

    var app = this

    app.http = []
    app.controllers = []
    app.dbconnections = []
    app.stop = stop
    app.env = env
    
    function stop() {
        server.stop()
    }

    process.argv.forEach(function (val, index, array) {
      if (val.hasOwnProperty('env')) {
        env = val.env
      }
    })

    // Inicializo o banco de dados
    dbInit(env, config, function (err, db) {
      if (!err) {
        // Salvo a referência do DB no collection de DBs
        app.dbconnections.push(db)

        // Construo o controlador de tarefas passando o DB e salvo no collection
        app.controllers.push(tasksCtrl.build(db))

        // Adiciono o server ao collection http
        app.http.push(server)

        // Inicializo o servidor http
        server.initialize(tasksCtrl, function (err, httpsrv) {
          if (err) {
            err = new Error('Erro na inicialização do servidor http! - ' + err)
            callback(err, null)
          } else {
            callback(null, app)
          }
        })
      } else {
        throw new Error('Erro na inicialização do banco de dados! - ' + err)
      }

    })
  }
})()
