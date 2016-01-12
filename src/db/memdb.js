var MEMDATABASE = (function () {
  return new Database

  function Database () {
    var db = this,
      data = []

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

    db.initialize = initialize 
    db.save = save
    db.remove = remove
    db.get = get
    db.query = query
    db.update = update

    function save (obj, callback) {
      data.push(obj)
      get(obj.id, function (data) {
        callback(data)
      })
    }
    
    function initialize(callback) {
        callback(true)
    }

    function get (id, callback) {
      // Pode ser que não achemos ninguém. E aí?
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
