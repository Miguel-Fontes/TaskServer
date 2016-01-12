'use strict'
module.exports = (function dbInit (env, config) {
  // Pode ser DEV, HMG ou PRD. Quero DEV in Memory, HMG e PRD com Mongo
  var db

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

  function mongoInstanceFactory () {
    var MongoClient = require('mongodb').MongoClient,  db

    var url = 'mongodb://' + config.host + ':' + (config.port || '27017') + '/' + config.schema
    console.log(url)

    // Initialize connection once
    MongoClient.connect(url, function (err, database) {
      if (err) throw err
      db = database

      // Start the application after the database connection is ready
      // app.listen(3000)
      // console.log('Listening on port 3000')
      console.log('vim aqui')
    })
  }
})()
