'use strict'
module.exports = function dbInit (env, config, callback) {
    //TODO: Tratamento de erros para o caso das configurações não existirem
    var dbModule = config.env[env].db,
      dbConfig = (dbModule in config.db ? config.db[dbModule][env] : { })

  // Lógica de inicialização do Database está encapsulada dentro do próprio objeto do DB
  // passo à frente o callback. O retorno pro callback será err e o database.
  require('./' + dbModule)
    .build(dbConfig)
    .initialize(callback)
}
