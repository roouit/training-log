const pool = require('../utils/db')

const User = (user) => {
  this.username = user.username
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.email = user.email
}

User.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * from user', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = User
