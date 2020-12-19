const { Room, User } = require('../model/models')
const { jwtAppSecret } = require('../utils/config')
const { authenticateToken } = require('../middleware/authentication')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')
var express = require('express')
var jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const { getAverage } = require('../utils/helper_functions')

var router = express.Router()

const rooms = {}

router.get('/create', (req, res) => {
    const roomID = uuidv4()
    const userID = uuidv4()

    const token = jwt.sign({ userID: userID, roomID: roomID, role:'admin' }, jwtAppSecret)


    const username = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })

    const newRoom = new Room(roomID, new User(userID, username))
    rooms[roomID] = newRoom

    res.cookie('poker',token, { maxAge: 9000000, httpOnly: false })
    res.status(200).json({ roomID, userID, token, username })
})

router.post('/addUser', (req, res) => {
    console.log('entered to addUser')
    const roomID = req.body.roomID
    const realRoom = rooms[roomID]

    const userID = uuidv4()
    const username = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })
    const token = jwt.sign({ userID: userID, roomID: roomID, role:'user' }, jwtAppSecret)

    realRoom.upsertUser(userID, username)

    res.status(200).json({ username, userID, token })
})

router.use(authenticateToken)

router.post('/changeRoomState', (req, res) => {
    console.log('entered to changeRoomState')
    const roomID = req.body.roomID
    const newState = req.body.roomState
    const realRoom = rooms[roomID]

    realRoom.changeStatus(newState)
    res.status(200).end()
})

router.get('/status', (req, res) => {
    console.log('/status with userid', req.token.userID)
    const realRoom = rooms[req.token.roomID]
    const room = clone(realRoom)

    if (room.status === 'start') {
        delete room.votes
        res.status(200).json(room)
        return
    } else if (room.status === 'voting') {
        room.votes.map( vote => {
            if (vote.score !== null) {
                vote.score = 'voted'
            }
        })
        res.status(200).json(room)
    } else if (room.status === 'finish') {
        res.status(200).json(room)
    }
    return
})

router.post('/changeUsername', (req, res) => {
    const username = req.body.username
    const userID = req.token.userID
    console.log('/changeUsername with userid', userID, 'to ', username)

    const realRoom = rooms[req.token.roomID]
    realRoom.upsertUser(userID, username)

    res.status(200).send()
})

router.post('/vote', (req, res) => {
    // the followings also appear in token, we can change here
    const roomID = req.body.roomID
    const score = req.body.score
    const userID = req.body.userID
    console.log('/vote')

    const realRoom = rooms[roomID]
    const currentUser = realRoom.users.filter(user => user.userID === userID)
    realRoom.voteFromUser(currentUser, score)

    res.status(200).end()
})

router.post('/result/', (req, res) => {
    console.log('/result')
    const roomID = req.body.roomID

    const realRoom = rooms[roomID]
    console.log(realRoom.votes)
    const avg = getAverage(realRoom.votes.map(vote => vote.score))
    console.log('avg', avg)

    res.status(200).json({ 'strategy': 'averageScore', score: avg })
})

router.post('/flushVotes', (req, res) => {
    console.log('/flushVotes')
    const roomID = req.body.roomID

    const realRoom = rooms[roomID]
    realRoom.flushVotes()

    res.status(200).end()
})

function clone(a) {
    return JSON.parse(JSON.stringify(a))
}

module.exports = router