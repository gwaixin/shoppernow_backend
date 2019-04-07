const { Router } = require('express')
const router = Router()
const { Category, Department } = require('../database')

// let Category = require('../model/Category')

// list all category here
router.get('/categories', (req, res) => {
    Category.findAll({ include: [ Department ] }).then(data => {
        res.json({ status: true, categories: data })
    })
})

module.exports = router