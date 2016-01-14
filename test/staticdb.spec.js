describe('Static Database', function () {
  var config = require('./../app.conf.js')
  var expect = require('chai').expect
  var fs = require('fs')
  var dbfile = config.db.staticdb.hmg.file
  var db = require('../src/db/staticdb')
    .build(config.db.staticdb.hmg)

  function Task (id, description, done) {
    this.id = id
    this.description = description
    this.done = done
  }

  var testTask = new Task(555, 'StaticDb Test Task', false)
  var testTask2 = new Task(556, 'StaticDb Test Task 2', false)

  var updatedTask = {id: 555, description: 'StaticDbUpdatedTask', done: false}
  var updatedTask2 = {id: 556, description: 'StaticDb Test Task 2', done: true}

  // Helper function para leitura do arquivo da database
  function readDbFile (callback) {
    fs.readFile(dbfile, {flag: 'a+'}, function (err, dbData) {
      if (err) {
        callback(err, [])
      } else {
        try {
          data = (dbData.toString() != '') ? (JSON.parse(dbData.toString())) : []
        } catch (e) {
          console.log('Erro no parse -', e)
          console.log(dbData.toString())
        }

        callback(err, data)
      }
    })
  }

  describe('DB api', function () {
    it('should define initialize', function (done) {
      expect(db.initialize).not.to.be.undefined
      done()
    })

    it('should initialize', function (done) {
      db.initialize(function (err, dbase) {
        db = dbase
        done()
      })
    })

    it('should define save', function (done) {
      expect(db.save).not.to.be.undefined
      done()
    })

    it('should define remove', function (done) {
      expect(db.remove).not.to.be.undefined
      done()
    })

    it('should define get', function (done) {
      expect(db.get).not.to.be.undefined
      done()
    })

    it('should define query', function (done) {
      expect(db.query).not.to.be.undefined
      done()
    })

    it('should define update', function (done) {
      expect(db.update).not.to.be.undefined
      done()
    })
  })

  describe('Database', function () {
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

    it('should have written 2 tasks into the db file, ids 555 and 556', function (done) {
      readDbFile(function (err, data) {
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

    it('should return all tasks (2) with the ids 555 and 556', function (done) {
      db
        .query(function (data) {
          expect(data).to.have.length.of(2)
          expect(data[0]).to.be.equal(testTask)
          expect(data[1]).to.be.equal(testTask2)
          done()
        })
    })

    it('should update task id 555 description to StaticDbUpdatedTask', function (done) {
      db
        .update(updatedTask, function (data) {
          expect(data).to.have.length.of(1)
          expect(data[0].description).to.be.equal(updatedTask.description)
          done()
        })
    })

    it('should update task id 556 done to True', function (done) {
      db
        .update(updatedTask2, function (data) {
          expect(data).to.have.length.of(1)
          expect(data[0].done).to.be.equal(updatedTask2.done)
          done()
        })
    })

    it('should have updated the 2 tasks into the db file', function (done) {
      readDbFile(function (err, data) {
        expect(data).to.have.length.of(2)

        expect(data[0].id).to.be.equal(updatedTask.id)
        expect(data[0].description).to.be.equal(updatedTask.description)
        expect(data[0].done).to.be.equal(updatedTask.done)

        expect(data[1].id).to.be.equal(updatedTask2.id)
        expect(data[1].description).to.be.equal(updatedTask2.description)
        expect(data[1].done).to.be.equal(updatedTask2.done)

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

    it('should have deleted task 555 from the db file', function (done) {
      readDbFile(function (err, data) {
        expect(data).to.have.length.of(1)
        expect(data).not.to.include(updatedTask)
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

    it('should have deleted task 556 from the db file', function (done) {
      readDbFile(function (err, data) {
        expect(data).to.have.length.of(0)
        expect(data).not.to.include(updatedTask2)
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

    it('should have deleted all data from file', function (done) {
      readDbFile(function (err, data) {
        expect(err).to.be.null
        expect(data).to.have.length.of(0)
        expect(data).not.to.include(updatedTask2)
        done()
      })
    })

  })
})
