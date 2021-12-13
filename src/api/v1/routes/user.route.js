const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  connectionLimit: 10
}

const pool = mysql.createPool(config)

router.get('/', (req, res) => {
  pool.query('SELECT * from user', (error, results) => {
    if (error) {
      console.log(error)
    } else {
      res.send(results)
    }
  })
})

module.exports = router
