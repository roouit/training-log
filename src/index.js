const express = require('express')
const cors = require('cors')
require('dotenv').config()

const userRoute = require('./api/v1/routes/user.route.js')
const errorController = require('./api/v1/controllers/error.controller')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use('/api/v1/users', userRoute)
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
