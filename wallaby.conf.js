module.exports = function (wallaby) {
  return {
    files: [
      'src/*.js',
      'src/db/*.js'
    ],

    tests: [
      'test/*.spec.js'
    ],
    env: {
      type: 'node',
      runner: 'node'
    }
  }
}
