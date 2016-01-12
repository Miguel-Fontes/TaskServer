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

    db.save = save
    db.remove = remove
    db.get = get
    db.query = query
    db.update = update

    function save (obj) {
      data.push(obj)
      return obj
    }

    function get (id) {
      // Pode ser que não achemos ninguém. E aí?
      var obj = data.getById(id)
      return obj
    }

    function update (obj) {
      data = data.filterById(obj.id)
      data.push(obj)
      return obj
    }

    function query (params) {
      return data
    }

    function remove (id) {
      var obj = get(id)
      if (obj) data = data.filterById(id)
      return obj
    }
  }
})()

module.exports = MEMDATABASE
