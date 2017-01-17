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
      return srv
    }

    function when (method, pattern, request, callback) {
      if (validMethod() && !matched) {
        if (validatePattern(pattern, request, false)) {
          callback()
          // Marco como true para que não sejam avaliados mais padroes
          matched = true
        }
      }

      function validMethod () {
        return method == request.method ? true : false
      }

      return srv
    }

    function end () {
      // Nesta função, resetar a condição do router.
      matched = false
    }

    function validatePattern (urlPattern, request, fast) {
      var patternSplit = '',
        requestUrlSplit = '',
        parsedPatternUrl = urlPattern,
        requestUrl = request.url

      request.params = {}

      log('Validação do Pattern', urlPattern, 'com a URL do request', requestUrl)

      // TODO: validar se url é string. Caso negativo, retornar erro.
      patternSplit = urlPattern.split('/').filter(isBlank)
      requestUrlSplit = requestUrl.split('/').filter(isBlank)

      if (fast && patternSplit[0] == requestUrlSplit[0]) {
        return true
      }

      // Validação do tamanho dos Arrays. Se não for igual significa que a URL não se encaixa no Pattern.
      // Vou retornar ''. Isto fará com que a URL nunca se encaixe no Pattern.
      if (patternSplit.length != requestUrlSplit.length && !fast) {
        //log('O tamanho dos arrays é diferente. Não é deste pattern (', urlPattern , '): ', urlSplit.length, '!=', requestUrlSplit.length)
        return false
      }

      // Crio um objeto javascript com os parâmetros e a posição do bloco para efetuar o
      // Matching de valores posteriormente.
      patternSplit.forEach(buildParams)

      log('URL para Matching', parsedPatternUrl)
      log('request url', requestUrl)
      return parsedPatternUrl == requestUrl

      function isBlank (value, index, array) {
        if (value != '') {
          return true
        }
      }

      function buildParams (value, index, array) {
        if (value.contains(':')) {
          parsedPatternUrl = parsedPatternUrl.replace(value, requestUrlSplit[index])
          request.params[value.replace(':', '')] = requestUrlSplit[index]
        }
      }

    }
  }
})()

module.exports = ROUTER
