'use strict'
module.exports = function dbInit (env, config, callback) {
  // Pode ser DEV, HMG ou PRD. Quero DEV in Memory, HMG e PRD com Mongo
  var db

  switch (env) {
    case 'DSV':
      db = memInstanceFactory(config, callback)
      break
    case 'HMG':
      db = mongoInstanceFactory(config, callback)
      // require('./db/mongodb').build({host: '192.168.99.100', schema: 'todonodehmg'})
      break
    case 'PRD':
      db = mongoInstanceFactory(config, callback)
      // require('./db/mongodb').build({host: '192.168.99.100', schema: 'todonode'})
      break
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
