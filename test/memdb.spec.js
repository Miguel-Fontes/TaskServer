describe('MeM Database', function () {
  var db = require('../src/db/memdb.js').build({})
  var expect = require('chai').expect

  function Task (id, description, done) {
    this.id = id
    this.description = description
    this.done = done
  }

  var testTask = new Task(555, 'Mem Db Test Task', false)
  var testTask2 = new Task(556, 'Mem Db Test Task 2', false)

  before(function (done) {
    db.initialize(function (err, dbase) {
      done()
    })
  })

  it('should save a Task with id 555', function (done) {
    db
      .save(testTask, function (data) {
        expect(data).to.have.length.of(1)
        expect(data[0].id).to.equal(testTask.id)
        expect(data[0].description).to.equal(testTask.description)
        expect(data[0].done).to.equal(testTask.done)
        done()
      })
  })

  it('should save a Task with id 556 ', function (done) {
    db
      .save(testTask2, function (data) {
        expect(data).to.have.length.of(1)
        expect(data[0].id).to.equal(testTask2.id)
        expect(data[0].description).to.equal(testTask2.description)
        expect(data[0].done).to.equal(testTask2.done)
        done()
      })
  })

  it('should return all tasks (2) with the ids 555 and 556', function (done) {
    db
      .query(function (data) {
        expect(data).to.have.length.of(2)
        expect(data[0]).to.be.equal(testTask)
        expect(data[1]).to.be.equal(testTask2)
        done()
      })
  })

  it('should update task id 555 description to mongoDbUpdatedTask', function (done) {
    testTask.description = 'mongoDbUpdatedTask'

    db
      .update(testTask, function (data) {
        expect(data).to.have.length.of(1)
        expect(data[0].description).to.be.equal(testTask.description)
        done()
      })
  })

  it('should update task id 556 done to True', function (done) {
    testTask2.done = true
    db
      .update(testTask2, function (data) {
        expect(data).to.have.length.of(1)
        expect(data[0].done).to.be.equal(testTask2.done)
        done()
      })
  })

  it('should return empty array when no arguments passed to remove', function (done) {
    db
      .remove('', function (data) {
        expect(data).to.be.instanceOf(Array)
        expect(data).to.have.length(0)
        done()
      })
  })

  it('should delete task id 555', function (done) {
    db
      .remove(555, function (data) {
        expect(data).to.be.instanceOf(Array)
        expect(data).to.have.length(1)
        done()
      })

  })

  it('should return an empty array for a get to deleted task 555', function (done) {
    db.get(testTask.id, function (data) {
      expect(data).to.be.instanceOf(Array)
      expect(data).to.have.length(0)
      done()
    })
  })

  it('should delete task id 556', function (done) {
    db
      .remove(556, function (data) {
        expect(data).to.be.instanceOf(Array)
        expect(data).to.have.length(1)
        done()
      })
  })

  it('should return an empty array for a get to deleted task 556', function (done) {
    db.get(testTask2.id, function (data) {
      expect(data).to.be.instanceOf(Array)
      expect(data).to.have.length(0)
      done()
    })
  })
})
