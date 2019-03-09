const User = require('../model/User')
const jwt = require('jsonwebtoken')

const authenticating = function (req, res, next) {
    try {
        console.log('testing this : ')
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, 'vfr4nhy6', function (err, payload) {
            console.log(payload)
            if (payload) {
                User.findOne(payload._id).then(
                    (doc)=>{
                        req.user=doc;
                        next()
                    }
                )
            } else {
               next()
            }
        })
    } catch(e) {
        next()
    }
}

module.exports = authenticating
