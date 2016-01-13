var router = require('./src/router').build()
var dbInit = require('./src/db/dbinit')
var tasksCtrlMod = require('./src/taskController')
var config = require('./app.conf')
var server = require('./src/server').build(config.http)

// Pode ser DEV, HMG ou PRD. Quero DEV in Memory, HMG e PRD com Mongo
var env

// Vou usar o escopo geral do processo
var app = this

app.http = []
app.controllers = []
app.dbconnections = []
app.stop = stop
app.env = env

function stop () {
  server.stop()
}

// Busto o ambiente dos aggumentos de linha de comando
env = process.argv[2] ? process.argv[2] : 'dsv'

// Inicializo o banco de dados antes
dbInit(env, config, function (err, db) {
  if (!err) {
    // Salvo a referência do DB no collection de DBs
    app.dbconnections.push(db)

    // Construo o controlador de tarefas passando o DB
    var tasksCtrl = tasksCtrlMod.build(db)
    //  e salvo no collection
    app.controllers.push(tasksCtrl)

    // Adiciono o server ao collection http
    app.http.push(server)

    // Inicializo o servidor http
    server.initialize(tasksCtrl, function (err, httpsrv) {
      if (err) {
        err = new Error('Erro na inicialização do servidor http! - ' + err)
      }
    })
  } else {
    throw new Error('Erro na inicialização do banco de dados! - ' + err)
  }
})
