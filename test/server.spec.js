var assert = require('assert')
var request = require('supertest')
var app = require('../src/server')

var srv = request(app)

// Helper task model
function Task (id, description, done) {
  this.id = id
  this.description = description
  this.done = done
}

describe('Node Todo Backend Test Suite', function () {
  after(function (done) {
    app.close()
    done()
  })

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
          .get('/tasks')
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

  describe('Flow validation', () => {
    it('will create a new task via post and validate the returned data', (done) => {
      var task = new Task(1000, 'Tarefa para testes', false)
      srv
        .post('/tasks')
        .send(JSON.stringify(task))
        .expect(201, /Tarefa para testes/, done)
    })

    it('i request the newly created task via get', (done) => {
      srv
        .get('/tasks/1000')
        .expect(200, /Tarefa para testes/, done)
    })

    it('updating the task description to "my updated task"', (done) => {
      var task = new Task(1000, 'my updated task', false)
      srv
        .put('/tasks/1000')
        .send(JSON.stringify(task))
        .expect(200, /my updated task/, done)
    })

    it('should return "my updated task" by ID', (done) => {
      srv
        .get('/tasks/1000')
        .expect(200, /my updated task/, done)
    })

    it('deleting my task', (done) => {
      srv
        .delete('/tasks/1000')
        .expect(200, done)
    })

    it('double checking, it should not exists', (done) => {
      srv
        .get('/tasks/1000')
        .expect(404, done)
    })
  })
})
