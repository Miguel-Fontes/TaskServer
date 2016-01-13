module.exports = {
  // Configurações do servidor HTTP
  http: {
    port: '8080',
    hostname: '127.0.0.1'
  },

  // Os ambientes disponíveis.
  // Para criar um novo ambiente, adicionar no objeto as configurações necessárias
  
  env: {
    // db: indica qual o DB do ambiente
    dsv: {
      db: 'mem'
    },

    hmg: {
      db: 'mongo'
    },

    prd: {
      db: 'mongo'
    },
  },

  // Configurações de Database. 
  // Se houverem configurações diferentes para ambientes de desenvolvimento, 
  // testes e produção definir com as keys db, hmg e prd
  db: {
    mongo: {
      dsv: {
        host: '192.168.99.100',
        port: '27017',
        schema: 'todonodedsv'
      },

      hmg: {
        host: '192.168.99.100',
        port: '27017',
        schema: 'todonodehmg'
      },

      prd: {
        host: '192.168.99.100',
        port: '27017',
        schema: 'todonode'
      }
    }
  }
}
