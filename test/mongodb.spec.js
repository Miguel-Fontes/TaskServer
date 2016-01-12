describe('MongoDB', function () {
  var expect = require('chai').expect

  var mongoDb = require('../src/db/mongodb.js')
    .build({host: '192.168.99.100', schema: 'todonodehmg'})
    
  var db
  
  function Task (id, description, done) {
    this.id = id
    this.description = description
    this.done = done
  }

  var testTask = new Task(555, 'Mem Db Test Task', false)
  var testTask2 = new Task(556, 'Mem Db Test Task 2', false)

  it('should connect successfully into the database', function (done) {
    mongoDb.initialize(function (err, dbase) {
      expect(err).to.be.null
      db = dbase
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
        expect(data[0].id).to.be.equal(testTask.id)
        expect(data[0].description).to.be.equal(testTask.description)
        expect(data[0].done).to.be.equal(testTask.done)

        expect(data[1].id).to.be.equal(testTask2.id)
        expect(data[1].description).to.be.equal(testTask2.description)
        expect(data[1].done).to.be.equal(testTask2.done)

        done()
      })
  })

  it('should update task id 555 description to mongoDbUpdatedTask', function (done) {
    var updatedTask = {id: 555, description: 'mongoDbUpdatedTask', done: false}
    db
      .update(updatedTask, function (data) {
        expect(data).to.have.length.of(1)
        expect(data[0].description).to.be.equal(updatedTask.description)
        done()
      })
  })

  it('should update task id 556 done to True', function (done) {
    var updatedTask2 = {id: 556, description: 'Mem Db Test Task 2', done: true}

    db
      .update(updatedTask2, function (data) {
        expect(data).to.have.length.of(1)
        expect(data[0].done).to.be.equal(updatedTask2.done)
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
        expect(data).to.have.length(0)
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
        expect(data).to.have.length(0)
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

  it('should return 0 tasks', function (done) {
    db
      .query(function (data) {
        expect(data).to.have.length.of(0)
        done()
      })
  })
})
