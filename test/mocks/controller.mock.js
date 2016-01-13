module.exports = (function ctrlMock () {
  var rq, rs

  return {
    initialize: function () { return true },
    remove: function () { return true },
    query: function () { return true },
    update: function () { return true},
    get: function () { console.log('CTRL BOUNCE'); rs.end('get') },
    getAll: function () { return true },
    getOptions: function () { return true },
    save: function () { return 'save'  },
    forbidden: function () { return true },
    setTransaction: setTransaction
  }

  function setTransaction (req, res) {
    rq = req
    rs = res
  }
})()