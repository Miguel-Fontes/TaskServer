module.exports = (function staticDbFactory () {
  return {
    build: buildStaticDB
  }

  function buildStaticDB (config) {
    return new StaticDB(config)
  }

  function StaticDB (config) {
    var fs = require('fs')
    var memDb = require('./memdb')
    var db = this,
      dbfile = config.file

    db.initialize = initialize
    db.save = save
    db.remove = remove
    db.get = get
    db.query = query
    db.update = update

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

    // Inicializo a aplicação lendo o arquivo de DB e carregando na memória
    function initialize (callback) {
      // Vou usar um database baseado em memória internamente e gerenciar
      // apenas a gravação em arquivo aqui.  

      fs.readFile(dbfile, {flag: 'a+'}, function (err, dbData) {
        if (err) {
          callback(err, [])
        } else {
          try {
            data = (dbData.toString() != '') ? (JSON.parse(dbData.toString())) : []

            memDb
              .build({data: data})
              .initialize(function (err, mdb) {
                memDb = mdb
              })

          } catch (e) {
            err = new Error('Erro no parse! -', dbData.toString(), '-', e)
            callback(err, [])
          }

          callback(null, db)
        }
      })
    }

    function save (obj, callback) {
      memDb.save(obj, function (data) {
        sync(function (err, d) {
          callback(data)
        })
      })
    }

    function remove (id, callback) {
      memDb.remove(id, function (obj) {
        sync(function (err, d) {
          callback(obj)
        })
      })
    }

    function query (callback) {
      memDb.query(function (data) {
        callback(data)
      })
    }

    function update (obj, callback) {
      memDb.update(obj, function (data) {
        sync(function (err, d) {
          callback(data)
        })
      })
    }

    function get (id, callback) {
      memDb.get(id, function (data) {
        callback(data)
      })
    }

    function sync (callback) {
      var db = memDb.query(function (data) {
        fs.writeFile(dbfile, JSON.stringify(data), {flag: 'w+'}, function (err) {
          if (err) {
            callback(err, data)
          } else {
            callback(null, data)
          }
        })
      })
    }
  }
})()
