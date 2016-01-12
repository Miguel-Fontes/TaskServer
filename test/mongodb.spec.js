describe('MongoDB', () => {

  var db = require('../src/db/mongodb.js')
  var expect = require('chai').expect

  function Task (id, description, done) {
    this.id = id
    this.description = description
    this.done = done
  }

  var testTask = new Task(555, 'Mem Db Test Task', false)
  var testTask2 = new Task(556, 'Mem Db Test Task 2', false)

  it('should save a Task with id 555', () => {
    db
      .save(testTask, function (data) {
        expect(data).to.have.length.of(1)
        expect(data[0].id).to.equal(testTask.id)
        expect(data[0].description).to.equal(testTask.description)
        expect(data[0].done).to.equal(testTask.done)
      })
  })

  it('should save a Task with id 556 ', () => {
    db
      .save(testTask2, function (data) {
        expect(data).to.have.length.of(1)
        expect(data[0].id).to.equal(testTask2.id)
        expect(data[0].description).to.equal(testTask2.description)
        expect(data[0].done).to.equal(testTask2.done)
      })
  })

  it('should return all tasks (2) with the ids 555 and 556', () => {
    db
      .query(function (data) {
        expect(data).to.have.length.of(2)
        expect(data[0]).to.be.equal(testTask)
        expect(data[1]).to.be.equal(testTask2)
      })
  })

  it('should update task id 555 description to mongoDbUpdatedTask', () => {
    testTask.description = 'mongoDbUpdatedTask'

    db
      .update(testTask, function (data) {
        expect(data).to.have.length.of(1)
        expect(data[0].description).to.be.equal(testTask.description)
      })
  })

  it('should update task id 556 done to True', () => {
    testTask2.done = true
    db
      .update(testTask2, function (data) {
        expect(data).to.have.length.of(1)
        expect(data[0].done).to.be.equal(testTask2.done)
      })
  })

  it('should return empty array when no arguments passed to remove', () => {
    db
      .remove('', function (data) {
        expect(data).to.be.instanceOf(Array)
        expect(data).to.have.length(0)
      })
  })

  it('should delete task id 555', () => {
    db
      .remove(555, function (data) {
        expect(data).to.be.instanceOf(Array)
        expect(data).to.have.length(1)
      })

  })

  it('should return an empty array for a get to deleted task 555', () => {
    db.get(testTask.id, function (data) {
      expect(data).to.be.instanceOf(Array)
      expect(data).to.have.length(0)
    })
  })

  it('should delete task id 556', () => {
    db
      .remove(556, function (data) {
        expect(data).to.be.instanceOf(Array)
        expect(data).to.have.length(1)
      })
  })
  
    it('should return an empty array for a get to deleted task 556', () => {
    db.get(testTask2.id, function (data) {
      expect(data).to.be.instanceOf(Array)
      expect(data).to.have.length(0)
    })
  })
})