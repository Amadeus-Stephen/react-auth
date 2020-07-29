const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) { //error handling
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}` //makes sure that the username
                                                                            // is unqiue 
            })
        }
        else { 
            // after the checks the new user is created , saved, then returned to the caller
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        next()
    },
    passport.authenticate('local'), //authenticates user with the local strategy
    (req, res) => {
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)
// will login user in if already pass authentication
router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

// returns all active users - get rid of this in post production
// or atleast lock it behind a password
router.get('/list', (req,res) => {
    User.find()
    .then((data) => {
        res.json(data)
    } )
})
// deletes user by given http req param id - again get rid of this in post or lock it 
router.delete('/:id' , (req , res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => {
        res.json("deleted user")
    })
    .catch((err) => {
        res.json(`Error: ${err}`)
    })
})
// logs user out of the express / passport session 
router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router