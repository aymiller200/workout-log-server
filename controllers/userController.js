const router = require('express').Router();
const bcrypt = require('bcryptjs')
const User = require('../models/user');
const jwt = require('jsonwebtoken')

router.get('/test', (req, res) => {
    res.send('This is the userController')
})

router.post('/register', (req, res) => {
    User.create({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 10)
    })
    .then(user => {
        let token = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '1d' })
        res.send({ user,token })
    })
    .catch(error => {
        res.status(500).send({ error })
    })
})

router.post('/login', (req, res) =>{
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(user =>{
        
        if(user){
            bcrypt.compare(req.body.user.password, user.password, function(err, matches){
                matches ? generateToken(user) : res.send('Password is incorrect, try again!')
            })

            function generateToken(user){
                let token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn:'1d'})

                res.send({user, token})
            }
        }else{
            res.send('No user found!')
        }

    }).catch(err => res.status(500).json({error: err}))
})



module.exports = router