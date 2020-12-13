var express = require('express')
var router = express.Router()

router.get('/ping', (req, res) => {
    res.status(400).send('pong')
})

module.exports = router