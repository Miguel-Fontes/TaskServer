'use strict'
module.exports = function dbInit (env, config, callback) {
  var dbModule = config.env[env].db,
    dbConfig = config.db[dbModule][env] || { }

  dbFactory(dbModule, dbConfig, callback)

  function dbFactory (dbMod, dbConf, callback) {
    // Lógica de inicialização do Database está encapsulada dentro do próprio objeto do DB
    // passo à frente o callback. O retorno pro callback será err e o database.
    require('./' + dbMod)
      .build(dbConf)
      .initialize(callback)
  }
}
