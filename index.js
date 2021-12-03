const express = require('express')
const mysql = require('mysql')
var cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())

const port = process.env.PORT || 8080

let config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
  connectionLimit: 10
}

var pool = mysql.createPool(config)
app.get('/', (req, res) => {
  pool.query('SELECT * from locations', (error, results) => {
    if (error) {
      console.log(error)
    } else {
      res.send(results)
    }
  })
})

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`)
})
