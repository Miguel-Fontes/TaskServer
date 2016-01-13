module.exports = (function tasksFactory () {
  return {
    build: tasksBuilder
  }

  function tasksBuilder (db) {
    return new Tasks(db)
  }

  function Tasks (db) {
    var tasksCtrl = require('./taskController').build(db)
    var tasksRouter = require('./tasks-router').build(tasksCtrl)

    var tasks = this

    tasks.initialize = initialize
    tasks.routes = getRoutes

    function getRoutes () {
      return tasksRouter.route
    }

    function initialize (callback) {
      callback(null, tasks)
    }

  }
})()
