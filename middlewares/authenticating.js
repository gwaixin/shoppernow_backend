const jwt = require('jsonwebtoken')
const { Customer } = require('../database')

const authenticating = function (req, res, next) {
    try {

        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, 'vfr4nhy6', function (err, payload) {

            if (payload) {
                
                req.customer = payload.customer
                next()
                // User.findOne(payload._id).then(
                //     (doc)=>{
                //         req.user=doc;
                //         next()
                //     }
                // )
            } else {
               next()
            }
        })
    } catch(e) {
        next()
    }
}

module.exports = authenticating
