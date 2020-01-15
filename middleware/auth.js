const config = require('../config/keys')
const jwt = require('jsonwebtoken')

function auth (req, res, next) {
  const token = req.header('x-auth-token')

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' })

  try {
    // Verify token

    const decoded = jwt.verify(token, config.jwtSecret)

    // Add user from payload
    req.user = decoded
    next() // Pass to next middleware
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' })
  }
}

module.exports = auth
