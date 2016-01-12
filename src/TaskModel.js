// VAI PRO MÓDULO ORM FUTURAMENTE
function TaskModel (id, descricao, status) {
  // Dados mo Modelo
  this.id
  this.descricao = descricao
  this.status = status

  this.toString = toString

  // API
  this.save = save
  this.update = update
  this.remove = remove
  this.get = get

  // Funcionalidades
  function toString () {
    return this.id + ' - ' + this.descricao + '. Status: ' + this.status ? 'completa' : 'pendente'
  }

  function save () {
    //log('Salvando tarefa')
  }

  function update () {
    //log('Update tarefa')
  }

  function remove () {
    //log('Remove tarefa')
  }

  function get () {
    //log('Buscando tarefa')
  }
}

module.exports = TaskModel