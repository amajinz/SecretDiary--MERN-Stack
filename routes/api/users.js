const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('../../config/keys')
const jwt = require('jsonwebtoken')

//User Model
const User = require('../../models/User')

// @route Post api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password, password_confirmation } = req.body;

    if (!name || !email || !password || !password_confirmation) {
        return res.status(400).json({ msg: "Please enter all fields." })
    }

    if (password !== password_confirmation) return res.status(400).json({ msg: "Invalid password confirmation" })

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "Email already exists" })
            const newUser = new User({
                name,
                email,
                password
            })
            //Create salt & hash
            bcrypt.genSalt(12, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.jwtSecret,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                        }
                                    })
                                }
                            )

                        })
                })
            })
        })
})



module.exports = router;