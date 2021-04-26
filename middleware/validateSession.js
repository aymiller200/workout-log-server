const User = require('../models/user');
const jwt = require('jsonwebtoken')

const validate = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(403).json({
            auth: false,
            message: 'There is no token being provided'
        })
    }else{

        jwt.verify(token, process.env.SECRET, (err, decodeToken) => {

            if(!err && decodeToken){
                User.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(user => {

                    if(!user) throw err; 

                    req.user = user;
                    return next();

                })
                .catch(err => next(err))
            }else{
                req.errors = err
                return res.status(500).send('Not Authorized')
            }

        })

    }

}

module.exports = validate