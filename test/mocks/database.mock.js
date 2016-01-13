module.exports = (function dbMock () {
  return {
    initialize: function (id, callback) { var result = []
      callback(result)  },
    remove: function (id, callback) { var result = []
      callback(result)  },
    query: function (callback) { var result = []
      callback(result)  },
    update: function (obj, callback) { var result = []
      callback(result) },
    get: function (id, callback) { var result = []
      callback(result)  },
    save: function (obj, callback) { var result = []
      callback(result)  }
  }
})()
