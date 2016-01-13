'use strict'
module.exports = function dbInit (env, config, callback) {
  // Pode ser DEV, HMG ou PRD. Quero DEV in Memory, HMG e PRD com Mongo
  var db

  switch (env) {
    case 'dsv':
      dbSelector()
      break
    case 'hmg':
      dbSelector()
      break
    case 'prd':
      dbSelector()
      break
  }

  function dbSelector () {
    if (config.env[env].db == 'mem') {
      db = memInstanceFactory(config.db.mem || { }, callback)
    } else {
      db = mongoInstanceFactory(config.db.mongo[env] || { }, callback)
    }
  }

  function genericDbFactory(dbModule, config, callback) {
      var gDb = require ('./' + dbModule)
      .build(config)
      
      gDb(callback)
  }

  function mongoInstanceFactory (config, callback) {
    var db = require('./mongodb')
      .build(config)

    // Lógica de inicialização do Database está encapsulada dentro do próprio objeto do Mongo
    // passo à frente o callback. O retorno pro callback será err e o database.
    db.initialize(callback)
  }

  function memInstanceFactory (config, callback) {
    var memDb = require('./memdb')
      .build(config)

    memDb.initialize(callback)
  }

}
