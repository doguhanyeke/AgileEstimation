var express = require('express')
var router = express.Router()

router.get('/ping', (req, res) => {
    console.log(req.body)
    res.status(200).json({ msg: 'pong' })
})

module.exports = router