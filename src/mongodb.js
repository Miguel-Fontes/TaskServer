var MongoClient = require('mongodb').MongoClient,
  assert = require('assert')

// Connection URL
var url = 'mongodb://192.168.99.100:27017/todonode'

MongoClient.connect(url, function (err, db) {
  assert.equal(null, err)
  console.log('Connected correctly to server')
})

var MONGODB = (function () {
  return new Database

  function Database () {
    var db = this

    Array.prototype.filterById = function (id) {
      var newArray
      newArray = this.filter(function (obj) { if (obj.id != id) return obj })
      return newArray
    }

    Array.prototype.getById = function (id) {
      var newArray
      newArray = this.filter(function (obj) { if (obj.id == id) return obj })
      return newArray
    }

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
            callback(r.ops)
            db.close()
          })
      })
    }

    function get (id, callback) {
      // Pode ser que não achemos ninguém. E aí?
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
            // TODO: Validar se atualizou alguém
            //console.log(r)
            get(obj.id, function (r) {
              callback(r)
              console.log(r)
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
      dbExecute(function (db) {
        db.collection('todo')
          .deleteOne({id: id}, function (err, r) {
            callback(r.ops)
            db.close()
          })
      })
    }

    function dbExecute (dml) {
      MongoClient.connect(url, function (err, db) {
        assert.equal(null, err)
        dml(db)
      })

    }

  }
})()

module.exports = MONGODB
