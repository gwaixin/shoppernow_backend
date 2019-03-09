const { Router } = require('express')
const router = Router()
const authenticate = require('../middlewares/authenticating')

// get cart
router.get('/cart', authenticate, (req, res) => {
    res.json({ status: true, user: req.user })
})

module.exports = router