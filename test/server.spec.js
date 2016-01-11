var assert = require('assert')
var request = require('supertest')
var app = require('../src/server')

var srv = request(app)

// Helper task model
function Task (id, descricao, status) {
  this.id = id
  this.descricao = descricao
  this.status = status
}

describe('Interface and Content Type validation:', () => {
  describe('Post requests', () => {

    it('to /tasks/:id should returns status code 201(CREATED)', (done) => {
      var task = new Task(999, 'Tarefa para testes', false)
      srv
        .post('/tasks')
        .send(JSON.stringify(task))
        .expect(201, done)
    })

  })

  describe('Post requests', () => {
    it('to /tasks/:id should returns status code 201(CREATED)', (done) => {
      var task = new Task(999, 'Tarefa para testes', false)
      srv
        .post('/tasks')
        .send(JSON.stringify(task))
        .expect(201, done)
    })
  })

  describe('Get requests', () => {

    it('to / (root) should return status 400(BAD REQUEST)', (done) => {
      srv
        .get('/')
        .expect(400, done)
    })

    it('to /tasks should return status code 200(OK)', (done) => {
      srv
        .get('/')
        .expect(200, done)
    })

    it('to /tasks should return content type json', (done) => {
      srv
        .get('/tasks')
        .expect('Content-Type', /json/, done)
    })

    it('to /tasks/:id should return status code 200(OK)', (done) => {
      srv
        .get('/tasks/999')
        .expect(200, done)
    })

    it('to /tasks/:id should return content type json', (done) => {
      srv
        .get('/tasks/999')
        .expect('Content-Type', /json/, done)
    })
  })

  describe('Put requests', () => {
    it('to /tasks/:id should return status code 200(OK)', (done) => {
      var task = new Task(999, 'Tarefa para testes', false)
      srv
        .put('/tasks/999')
        .send(JSON.stringify(task))
        .expect(200, done)
    })
  })

  describe('Delete requests', () => {

    it('to /tasks/:id should return status code 200(OK)', (done) => {
      srv
        .delete('/tasks/999')
        .expect(200, done)
    })

  })
})

describe('Flow validation:', () => {
  it('should create a new task and return it', (done) => {
    var task = new Task(1000, 'Tarefa para testes', false)
    srv
      .post('/tasks')
      .send(JSON.stringify(task))
      .expect(201, /Tarefa para testes/, done)
  })

  it('should get task', (done) => {
    srv
      .get('/tasks/1000')
      .expect(200, /Tarefa para testes/, done)
  })

  it('should update task description to updated task', (done) => {
    var task = new Task(1000, 'updated task', false)
    srv
      .put('/tasks/1000')
      .send(JSON.stringify(task))
      .expect(200, /updated task/, done)
  })

  it('should get updated task', (done) => {
    srv
      .get('/tasks/1000')
      .expect(200, /updated task/, done)
  })

  it('should delete task', (done) => {
    srv
      .delete('/tasks/1000')
      .expect(200, done)
  })
})