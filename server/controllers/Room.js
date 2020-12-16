const { Room, User } = require('../model/models')

var express = require('express')
var jwt = require('jsonwebtoken')


const { v4: uuidv4 } = require('uuid')

var router = express.Router()

const appSecret = 'dogu<3utku'

const rooms = {}

router.get('/create', (req, res) => {
    const roomID = uuidv4()
    const userID = uuidv4()

    var token = jwt.sign({ userID: userID, roomID: roomID, role:'admin' }, appSecret)

    const newRoom = new Room(roomID, new User(userID, "admin"))
    rooms[roomID] = newRoom

    res.cookie('poker',token, { maxAge: 9000000, httpOnly: false })
    res.status(200).json({ roomID, userID, token })
})

router.use(authenticateToken)

router.get('/status', (req, res) => {
    console.log("/status with userid", req.token.userID)
    realRoom = rooms[req.token.roomID]
    room = clone(realRoom)

    if (room.status == "start") {
        delete room.votes
        res.status(200).json(room)
        return
    } else if (room.status == "voting") {
        room.votes.map( vote => {
            if (vote.score !== nil) {
                vote.score = "voted"
            }
        })
        res.status(200).json(room)
    } else if (room.status == "finish") {
        res.status(200).json(room)
    }
    return
})


function clone(a) {
    return JSON.parse(JSON.stringify(a));
 }

 function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token, appSecret, (err, token) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403)
      }
      req.token = token
      next() // pass the execution off to whatever request the client intended
    })
}

module.exports = router