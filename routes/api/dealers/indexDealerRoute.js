
const express = require('express')

const router = express.Router()
const dealerRoute = require('./dealerRoute')

router.use('/', dealerRoute)

module.exports = router
