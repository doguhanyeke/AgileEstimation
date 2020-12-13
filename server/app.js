const express = require('express')
const cors = require('cors')
var PingRouter = require('./controllers/PingRouter')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', PingRouter)

module.exports = app