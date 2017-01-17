var router = require('./src/router').build()
var dbInit = require('./src/db/dbinit')
var config = require('./app.conf')
var httpServerMod = require('./src/server')
// TODO: Verifica essa parada ae 
// require('http').globalAgent.maxSockets = Infinity
// http.globalAgent.maxSockets = 10

var tasksMod = require('./src/tasks/tasks')

// Pode ser DEV, HMG ou PRD. Quero DEV in Memory, HMG e PRD com Mongo
var env = 'dsv', // Ambiente default é desenvolvimento
  server,
  tasks,
  app = this // Vou usar o escopo geral do processo

app.http = []
app.dbconnections = []
app.stop = stop
app.env = env

initialize()

// Funcionalidades
function initialize () {
  // Busto o ambiente dos aggumentos de linha de comando
  process.argv.forEach(function (value, index, array) {
    if (value == 'dsv' || value == 'hmg' || value == 'prd') {
      env = value
    }
  })

  // Inicializo o banco de dados antes
  dbInit(env, config, function (err, db) {
    if (!err) {
      tasksMod.build(db)
        .initialize(function (err, tasksInstance) {
          if (err) throw new Error('Erro na inicialização do modulo Tasks! - ' + err)
          tasks = tasksInstance
        })

      // Buildo o servidor http
      server = httpServerMod.build(config.http, routes)

      // Inicializo o servidor http
      server.initialize(function (err, httpsrv) {
        if (err) {
          err = new Error('Erro na inicialização do servidor http! - ' + err)
        }
      })

      // Adiciono o server ao collection http
      app.http.push(server)

      // Salvo a referência do DB no collection de DBs
      app.dbconnections.push(db)

    } else {
      throw new Error('Erro na inicialização do banco de dados! - ' + err)
    }
  })
}

function stop () {
  server.stop()
}

function routes (request, response) {
  router
    .all('/tasks', request, response, tasks.routes())
    .all('/', request, response, function (request, response) {
      response.writeHead(400, {'Content-Type': 'application/json'})
      response.end(JSON.stringify({'response': 'BAD REQUEST'}))
    })
    .end()
}

module.exports = app
