const express = require('express')
const cors = require('cors')
require('dotenv').config()

const userRoute = require('./api/v1/routes/user.route.js')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use('/api/v1/users', userRoute)

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`)
})
