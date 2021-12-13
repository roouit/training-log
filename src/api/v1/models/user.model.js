const pool = require('../utils/db')

const User = (user) => {
  this.username = user.username
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.email = user.email
}

User.getAll = (callback) => {
  pool.query('SELECT * from ser', (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
  })
}

module.exports = User
