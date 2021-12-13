const pool = require('../utils/db')

module.exports = {
  getAllUsers: (req, res) => {
    pool.query('SELECT * from user', (error, results) => {
      if (error) {
        console.log(error)
      } else {
        res.send(results)
      }
    })
  }
}
