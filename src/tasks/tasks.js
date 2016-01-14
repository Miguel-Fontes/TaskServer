module.exports = (function tasksFactory () {
  return {
    build: tasksBuilder
  }

  function tasksBuilder (db) {
    return new Tasks(db)
  }

  function Tasks (db) {
    var tasksCtrl,
      tasksRouter,
      tasks = this

    tasks.initialize = initialize
    tasks.routes = getRoutes // Executo para passar o resultado da função diretamente

    function getRoutes () {
      return tasksRouter.route
    }

    function initialize (callback) {
      tasksCtrl = require('./taskController')
        .build(db)

      tasksRouter = require('./tasks-router')
        .build(tasksCtrl)

      callback(null, tasks)
    }

  }
})()
