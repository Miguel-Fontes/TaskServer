var router = require('./src/router').build()
var dbInit = require('./src/db/dbinit')
var tasksCtrlMod = require('./src/tasks/taskController')
var config = require('./app.conf')
var server = require('./src/server').build(config.http)

//
var tasks = require('./src/tasks/tasks')

// Pode ser DEV, HMG ou PRD. Quero DEV in Memory, HMG e PRD com Mongo
var env = 'dsv' // Ambiente default é desenvolvimento 

// Vou usar o escopo geral do processo
var app = this

app.http = []
app.controllers = [] // SAIR
app.dbconnections = []
app.stop = stop
app.env = env

function stop () {
  server.stop()
}

// Busto o ambiente dos aggumentos de linha de comando
process.argv.forEach(function(value, index, array) {
   if (value == 'dsv' || value == 'hmg' ||  value == 'prd') {
       env = value
   }
})

// Inicializo o banco de dados antes
dbInit(env, config, function (err, db) {
  if (!err) {
    // Salvo a referência do DB no collection de DBs
    app.dbconnections.push(db)

    // Construo o controlador de tarefas passando o DB
    var tasksCtrl = tasksCtrlMod.build(db) // SAIR
    //  e salvo no collection
    app.controllers.push(tasksCtrl) // SAIR

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


function routes(request, response) {
    router
    .all('/tasks', request, response, tasks.routes)
    .end()
}
