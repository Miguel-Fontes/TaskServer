var MONGODB = (function mongoFactory () {
  return {
    build: buildMongo
  }

  function buildMongo (config) {
    return new MongoDB(config)
  }

  function MongoDB (config) {
    // Variaveis
    var mdb = this,
      db
    // Requires
    var assert = require('assert')

    // API
    mdb.initialize = initialize
    mdb.save = save
    mdb.remove = remove
    mdb.get = get
    mdb.query = query
    mdb.update = update

    // Inicialização
    function initialize (callback) {
      var MongoClient = require('mongodb').MongoClient

      // Connection URL
      var url = 'mongodb://' + config.host + ':' + (config.port || '27017') + '/' + config.schema

      // Initialize connection once
      MongoClient.connect(url, function (err, database) {
        if (err) throw err
        db = database
        callback(err, mdb)
      })
    }

    // Funções
    function save (obj, callback) {
      db.collection('todo')
        .insertOne(obj, function (err, r) {
          assert.equal(null, err)
          assert.equal(1, r.insertedCount)
          delete r.ops[0]._id // Removo o field _id
          callback(r.ops)
        })
    }

    function get (id, callback) {
      // Pode ser que não achemos ninguém. E aí?
      // TODO: Inserir ASSERT de quantidade de registros encontrados
      db.collection('todo')
        .find({'id': parseInt(id)})
        .toArray(function (err, r) {
          callback(r)
        })
    }

    function update (obj, callback) {
      db.collection('todo')
        .updateOne({'id': parseInt(obj.id)}, {$set: obj}, function (err, r) {
          assert.equal(null, err)
          assert.equal(1, r.matchedCount)
          assert.equal(1, r.modifiedCount)
          get(obj.id, function (r) {
            callback(r)
          })
        })
    }

    function query (callback) {
      db.collection('todo')
        .find({}, {_id: 0})
        .toArray(function (err, docs) {
          callback(docs)
        })
    }

    function remove (id, callback) {
      if (id) {
        db.collection('todo')
          .deleteOne({id: parseInt(id)}, function (err, r) {
            assert.equal(null, err)
            assert.equal(1, r.deletedCount)
            callback([])
          })
      } else {
        callback([])
      }
    }
  }
})()

module.exports = MONGODB
