// Prototypes ----------------------------------------------
String.prototype.contains = function (char) {
  var value = this.toString()
  return value.match(char) != undefined ? true : false
}
// ---------------------------------------------------------

var http = require('http'),
  hostname = '127.0.0.1',
  port = 8080

var router = require('./router').buildRouter()

var log = require('./log').log

var tasksCtrl = require('./taskController') // new TaskController()

var server = http.createServer()

server.on('request', handler)

module.exports = server

function handler (request, response) {
  log('------------------------------------------------------------------------------------------------')
  log('Request: METHOD:', request.method, ' - URL:', request.url)
  tasksCtrl.setTransaction(request, response)

  router
    .when('POST', '/tasks', request, tasksCtrl.save)
    .when('PUT', '/tasks/:id', request, tasksCtrl.update)
    .when('DELETE', '/tasks/:id', request, tasksCtrl.remove)
    .when('GET', '/tasks/:id', request, tasksCtrl.get)
    .when('GET', '/tasks', request, tasksCtrl.getAll)
    .when('OPTIONS', '/tasks/:id', request, tasksCtrl.options)
    .when('GET', '/', request, tasksCtrl.forbidden)
    .end()

  log('------------------------------------------------------------------------------------------------')
}

server.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port)
})

