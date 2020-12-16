const express = require('express')
const cors = require('cors')
var jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
var PingRouter = require('./controllers/PingRouter')
var RoomRouter = require('./controllers/Room')

const app = express()

const appSecret = 'dogu<3utku'


function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token, appSecret, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
}

app.use(cors())
app.use(express.json())
app.use('/', PingRouter)
app.use('/room', RoomRouter)

module.exports = app