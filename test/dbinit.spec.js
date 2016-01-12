describe('DB initialization Module', () => {
  var dbinit = require('./dbinit')
  var env = 'HMG'

  it('should create and return a MongoDB instance', function () {
    dbinit(env, {host: '192.168.99.100', schema: 'todonodehmg'})

  })
  it('should create and return a MeMDB instance')

})
