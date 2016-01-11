var log = require('./log').log

// TODO - Extrair esse controller para outro módulo.
var TASKCONTROLLER = (function taskCtrlBuilder (log) {
  return new TaskController

  function TaskController () {
    var ctrl = this, request, response,
      responseHeaders = {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'access-control-allow-headers': 'content-type, accept',
        'access-control-max-age': 10,
        'Content-Type': 'application/json'
      }
      // Access-Control-Allow-Origin -> Este header é usado para segurança de transação.
      //  Ele indica quais domínios poderão receber o retorno desta transação, tentando
      //  evitar ataques XSS. O correto é que esteja configurado com o domínio permitido
      //  a Acessar as informações retornadas. O wildcard * significa que qualquer domínio
      //  poderá ter acesso aos dados.

    // Access-Control-Allow-Methods -> Significa quais são os métodos HTTP aceitos pelo
      //  serviço. Qualquer transação que não seja GET ou POST faz uma requisição do tipo
      //  OPTIONS para checar quais são os métodos permitidos descritos nesse cabeçalho.
      //  Se não for retornada uma lista de métodos no HEADER da mensagem, a requisição
      //  é abortada. 

    // Atributos
    ctrl.request = request
    ctrl.response = response
    ctrl.tarefas = []

    // API
    ctrl.save = save,
    ctrl.update = update,
    ctrl.remove = remove,
    ctrl.get = get,
    ctrl.getAll = query,
    ctrl.forbidden = forbidden
    ctrl.setTransaction = setTransaction
    ctrl.options = options

    // Funcionalidades
    function setTransaction (req, res) {
      request = req
      response = res
      activate()
    }

    function activate () {
      // Prototypes
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

    }

    // Helper function para leitura dos streams de requests
    function readRequest (dataAction) {
      var body = []
      request.on('data', function (chunk) {
        body.push(chunk)
      }).on('end', function () {
        body = Buffer.concat(body).toString()
        dataAction(body)
      })
    }
    
    // Função Helper para escrever os responses
    function buildResponse (response, status, headers, value) {
      response.writeHead(status, headers)
      response.write(JSON.stringify(value) || '')
      return response
    }

    function save () {
      log('Salvando tarefa')
      readRequest(saveTask)
    }

    function saveTask (task) {
      var newTask = JSON.parse(task)
      ctrl.tarefas.push(newTask)

      buildResponse(response, 201, responseHeaders, newTask)
        .end()
    }

    function update () {
      log('Update tarefa')
      readRequest(updateTask)
    }

    function updateTask (task) {
      var updatedTask = JSON.parse(task)
      ctrl.tarefas = ctrl.tarefas.filterById(request.params.id)
      ctrl.tarefas.push(updatedTask)

      // Busco no vetor a tarefa para garantir a atualização
      updatedTask = ctrl.tarefas.getById(request.params.id)

      buildResponse(response, 200, responseHeaders, updatedTask)
        .end()
    }

    function remove () {
      log('Remover tarefa ID ', request.params.id)
      ctrl.tarefas = ctrl.tarefas.filterById(request.params.id)
      buildResponse(response, 200, responseHeaders)
        .end()
    }

    function get () {
      log('Buscando tarefa')
      var task = ctrl.tarefas.getById(request.params.id)

      // Se encontrei a tarefa, retorno para o cliente
      // Caso contrário, envio um status 404 
      if (task != '') {
        buildResponse(response, 200, responseHeaders, task)
          .end()
      } else {
        buildResponse(response, 404, responseHeaders)
          .end()
      }
    }

    function query () {
      log('Buscando todas as tarefas')
      var json = JSON.stringify(ctrl.tarefas)

      buildResponse(response, 200, responseHeaders, json)
        .end()
    }

    function forbidden () {
      log('Request inválido')

      buildResponse(response, 400, responseHeaders, 'BAD REQUEST')
        .end()
    }

    function options () {
      buildResponse(response, 200, responseHeaders)
        .end()
    }
  }
})(log)

module.exports = TASKCONTROLLER
