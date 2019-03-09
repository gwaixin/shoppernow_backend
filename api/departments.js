const { Router } = require('express')
const router = Router()

const Department = require('../model/Department')

// list all department here
router.get('/departments', (req, res) => {
    Department.find({}).exec((err, data) => {

        if (err) { 
            res.json({ status: false, error: err })

        } else {
            res.json({
                status: true,
                departments: data
            })
        }
    })
})

module.exports = router