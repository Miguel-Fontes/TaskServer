// Prototypes ----------------------------------------------
String.prototype.contains = function (char) {
  var value = this.toString()
  return value.match(char) != undefined ? true : false
}
// ---------------------------------------------------------

var ROUTER = (function routerFactory () {
  // API Factory
  return {
    build: build
  }

  function build () {
    return new Router()
  }

  // Class Router
  function Router () {
    var log = require('./log').log
    var matched = false,
      srv = this; // Bind do this do serviço à variável. Good Practice.

    // API
    srv.when = when
    srv.end = end
    srv.all = all
    // Funcionalidades

    function all (pattern, request, response, callback) {
      if (!matched) {
        if (validatePattern(pattern, request, true)) {
          callback(request, response)
          // Marco como true para que não sejam avaliados mais padroes
          matched = true
        }
      }
      // Chainning Cleverness
      return srv
    }

    function when (method, pattern, request, callback) {
      // Primeiro verifica o método que é o mais rápido, na boa
      if (validMethod() && !matched) {
        if (validatePattern(pattern, request, false)) {
          callback()
          // Marco como true para que não sejam avaliados mais padroes
          matched = true
        }
      }

      function validMethod () {
        // Implementar o método ALL aqui
        return method == request.method ? true : false
      }

      // Chainning Cleverness
      return srv
    }

    function end () {
      // Nesta função, resetar a condição do router.
      matched = false
    }

    function validatePattern (urlPattern, request, fast) {
      var urlSplit = '',
        requestUrlSplit = '',
        parsedUrl = request.url,
        requestUrl = request.url

      request.params = {}

      validateArguments()

      log('Validação do Pattern', urlPattern, 'com a URL do request', requestUrl)

      // TODO: validar se url é string. Caso negativo, retornar erro.
      urlSplit = urlPattern.split('/').filter(isBlank)
      requestUrlSplit = requestUrl.split('/').filter(isBlank)

      if (fast && urlSplit[0] == requestUrlSplit[0]) {
        return true
      }

      // Validação do tamanho dos Arrays. Se não for igual significa que a URL não se encaixa no Pattern.
      // Vou retornar ''. Isto fará com que a URL nunca se encaixe no Pattern.
      if (urlSplit.length != requestUrlSplit.length && !fast) {
        log('O tamanho dos arrays é diferente. Não é deste pattern (', urlPattern , '): ', urlSplit.length, '!=', requestUrlSplit.length)
        return false
      }

      // Crio um objeto javascript com os parâmetros e a posição do bloco para efetuar o
      // Matching de valores posteriormente.
      urlSplit.forEach(buildParams)

      log('URL para Matching', parsedUrl)
      log('request url', requestUrl)

      return parsedUrl == requestUrl

      function isBlank (value, index, array) {
        if (value != '') {
          return true
        }
      }

      function buildParams (value, index, array) {
        if (value.contains(':')) {
          parsedUrl = parsedUrl.replace(value, requestUrlSplit[index])
          request.params[value.replace(':', '')] = requestUrlSplit[index]
        }
      }

      function validateArguments () {
        // if (typeof (urlSplit) != string) { return false }
        // if (typeof (urlSplit) != string) { return false }
      }
    }
  }
})()

module.exports = ROUTER
