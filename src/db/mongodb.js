var MONGODB = (function mongoFactory () {
  return {
    build: buildMongo
  }

  function buildMongo (config) {
    return new MongoDB(config)
  }

  function MongoDB (config) {
    var db = this

    var MongoClient = require('mongodb').MongoClient,
      assert = require('assert')
    console.log(config)
    // Connection URL
    var url = 'mongodb://' + config.host + ':' + (config.port || '27017') + '/' + config.schema
    console.log(url)
    db.save = save
    db.remove = remove
    db.get = get
    db.query = query
    db.update = update

    function save (obj, callback) {
      dbExecute(function (db) {
        db.collection('todo')
          .insertOne(obj, function (err, r) {
            assert.equal(null, err)
            assert.equal(1, r.insertedCount)
            delete r.ops[0]._id // Removo o field _id
            callback(r.ops)
            db.close()
          })
      })
    }

    function get (id, callback) {
      // Pode ser que não achemos ninguém. E aí?
      // TODO: Inserir ASSERT de quantidade de registros encontrados
      dbExecute(function (db) {
        db.collection('todo')
          .find({'id': parseInt(id)})
          .toArray(function (err, r) {
            callback(r)
            db.close()
          })
      })
    }

    function update (obj, callback) {
      dbExecute(function (db) {
        db.collection('todo')
          .updateOne({'id': parseInt(obj.id)}, {$set: obj}, function (err, r) {
            assert.equal(null, err)
            assert.equal(1, r.matchedCount)
            assert.equal(1, r.modifiedCount)
            get(obj.id, function (r) {
              callback(r)
              db.close()
            })
          })
      })
    }

    function query (callback) {
      dbExecute(function (db) {
        db.collection('todo')
          .find({}, {_id: 0})
          .toArray(function (err, docs) {
            callback(docs)
            db.close()
          })
      })
    }

    function remove (id, callback) {
      if (id) {
        dbExecute(function (db) {
          db.collection('todo')
            .deleteOne({id: parseInt(id)}, function (err, r) {
              assert.equal(null, err)
              assert.equal(1, r.deletedCount)
              console.log(r.deletedCount)
              callback([])
              db.close()
            })
        })
      } else {
        console.log('id vazio')
        callback([])
      }
    }

    function dbExecute (callback) {
      MongoClient.connect(url, function (err, db) {
        assert.equal(null, err)
        callback(db)
      })

    }

  }
})()

module.exports = MONGODB
