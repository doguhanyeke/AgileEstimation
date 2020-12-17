var jwt = require('jsonwebtoken')
const { jwtAppSecret } = require('../utils/config')

const authenticateToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401) // if there isn't any token
    jwt.verify(token, jwtAppSecret, (err, token) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.token = token
        next() // pass the execution off to whatever request the client intended
    })
}

module.exports = {
    authenticateToken
}
