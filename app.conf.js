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
      db: 'memdb'
    },

    hmg: {
      db: 'mongodb'
    },

    prd: {
      db: 'mongodb'
    },
  },

  // Configurações de Database. 
  // Se houverem configurações diferentes para ambientes de desenvolvimento, 
  // testes e produção definir com as keys db, hmg e prd
  db: {
    mongodb: {
      dbClassName: 'MongoDB',

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
      },
    },

    memdb: {
      dbClassName: 'MeMDatabase'
    },

    staticdb: {
      dbClassName: 'StaticDB',
      
      dsv: {
        file: '.\\db\\todo-dsv.db'
      },
      hmg: {
        file: '.\\db\\todo-hmg.db'
      },
      prd: {
        file: '.\\db\\todo.db'
      }
    }

  }
}
