const { Room, User } = require('../model/models')
const { jwtAppSecret } = require('../utils/config')
const { authenticateToken } = require('../middleware/authentication')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')
var express = require('express')
var jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const { getAverage, mostVoted } = require('../utils/helper_functions')

var router = express.Router()

const rooms = {}

const scoreStrategyNames = ['averageScore', 'mostVoted']
const scoreStrategies = {
    'averageScore': votes => getAverage(votes.map(vote => vote.score)),
    'mostVoted': votes => mostVoted(votes.map(vote => vote.score)),
}


router.get('/create', (req, res) => {
    const roomID = uuidv4()
    const userID = uuidv4()

    const token = jwt.sign({ userID: userID, roomID: roomID, role:'admin' }, jwtAppSecret)


    const username = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })

    const newRoom = new Room(roomID, new User(userID, username), scoreStrategyNames)
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
    const oldState = realRoom.status

    switch(newState) {
    case 'finish':
        if (oldState !== 'voting') {
            res.status(400).send()
            return
        }
        const results = []
        realRoom.calculationStrategies.map(strategy => results.push({strategy, score:scoreStrategies[strategy](realRoom.votes)}))
        realRoom.results = results
        break
    case 'voting':
        console.log('newstate', newState)
        console.log('oldstate', oldState)
        console.log('room', realRoom)

        if (oldState === 'voting') {
            res.status(400).send()
            return
        }
        realRoom.flushVotes()
        break
    case 'start':
        if (oldState !== 'finish') {
            res.status(400).send()
            return
        }
        realRoom.flushVotes()
        break
    }

    realRoom.changeStatus(newState)
    res.status(200).end()
})

router.get('/status', (req, res) => {
    const realRoom = rooms[req.token.roomID]

    if (!realRoom) {
        res.status(200).json({ data: 'no such room' })
        return
    }

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
    const userID = req.token.userID
    console.log('/vote', userID)

    const realRoom = rooms[roomID]
    console.log('/vote users', realRoom.users)
    const currentUserList = realRoom.users.filter(user => user.id === userID)
    if (currentUserList.length === 0 ) {
        res.status(400).json({})
        return
    }
    const currentUser = currentUserList[0]

    console.log('/vote votes', realRoom.votes)
    realRoom.voteFromUser(currentUser, score)

    res.status(200).end()
})

router.post('/clearVote', (req, res) => {
    console.log('/clearVote')
    const roomID = req.body.roomID
    const userID = req.body.userID
    console.log('userID ', userID, 'roomID: ', roomID)
    const realRoom = rooms[roomID]
    if (! realRoom) {
        res.status(400).end()
        return
    }
    realRoom.clearVote(userID)

    res.status(200).end()
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