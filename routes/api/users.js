const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('../../config/keys')
const jwt = require('jsonwebtoken')

// User Model
const User = require('../../models/User')

// @route Post api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
  const { name, email, password, passwordConfirmation } = req.body

  if (!name || !email || !password || !passwordConfirmation) {
    return res.status(400).json({ msg: 'Please enter all fields.' })
  }

  if (password !== passwordConfirmation) return res.status(400).json({ msg: 'Invalid password confirmation' })

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if (user) return res.status(400).json({ msg: 'Email already exists' })

      const newUser = new User({
        name,
        email,
        password
      })

      const sendRes = (err, token, user) => {
        if (err) throw err
        return res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        })
      }

      const createUser = (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser.save()
          .then(user =>
            jwt.sign(
              { id: user.id },
              config.jwtSecret,
              { expiresIn: 36000 },
              (err, token) => sendRes(err, token, user))
          )
      }

      bcrypt.genSalt(12, (err, salt) => {
        if (err) throw err
        bcrypt.hash(
          newUser.password,
          salt,
          (err, hash) => createUser(err, hash, newUser.password))
      })
    })
})

module.exports = router
