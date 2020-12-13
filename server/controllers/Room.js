const {Room, Vote, User} = require('../model/models')

var express = require('express')
var jwt = require('jsonwebtoken');


const { v4: uuidv4 } = require('uuid');

var router = express.Router()

const appSecret = 'dogu<3utku'

const rooms = {}

router.get('/create', (req, res) => {
    const roomID = uuidv4();
    const userID = uuidv4();

    var token = jwt.sign({ userID: userID, roomID: roomID, role:"admin" }, appSecret);

    const newRoom = new Room(roomID,userID);
    rooms[roomID] = newRoom


    res.cookie('poker',token, { maxAge: 9000000, httpOnly: false });
    res.status(200).json({ msg: 'pong' })
})

module.exports = router