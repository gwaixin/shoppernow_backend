const { Router } = require('express')
const router = Router()

let Category = require('../model/Category')

// list all category here
router.get('/categories', (req, res) => {
    Category.find({}).exec((err, data) => {

        if (err) { 
            res.json({ status: false, error: err })

        } else {
            res.json({
                status: true,
                categories: data
            })
        }
    })
})

module.exports = router