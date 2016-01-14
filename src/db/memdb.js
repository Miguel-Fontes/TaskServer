var MEMDATABASE = (function () {
  return {
    build: memDatabaseFactory
  }

  function memDatabaseFactory (config) {
    return new MeMDatabase(config)
  }

  function MeMDatabase (config) {
    var db = this,
      data = []

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

    function initialize (callback) {
      callback(null, db)
    }

    function save (obj, callback) {
      data.push(obj)
      get(obj.id, function (data) {
        callback(data)
      })
    }

    function get (id, callback) {
      // TODO: Pode ser que não achemos ninguém. E aí?
      var obj = data.getById(id)
      callback(obj)
    }

    function update (obj, callback) {
      data = data.filterById(obj.id)
      data.push(obj)
      get(obj.id, function (data) {
        callback(data)
      })
    }

    function query (callback) {
      callback(data)
    }

    function remove (id, callback) {
      get(id, function (obj) {
        if (obj) data = data.filterById(id)
        callback(obj)
      })
    }
  }
})()

module.exports = MEMDATABASE
