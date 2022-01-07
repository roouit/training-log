const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const userRoute = require('./api/v1/routes/user.route.js')
const exerciseRoute = require('./api/v1/routes/exercise.route.js')

const errorController = require('./api/v1/controllers/error.controller')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.static(path.resolve(__dirname, 'frontend/build')))
app.use(express.json())

app.use('/api/v1/users', userRoute)
app.use('/api/v1/exercises', exerciseRoute)

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'))
})

app.all('*', (req, res, next) => {
  next({
    statusCode: 404,
    message: 'URL not found',
    url: req.url,
    method: req.method
  })
})
app.use(errorController)

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`)
})
