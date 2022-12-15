
const express = require('express')

const router = express.Router()
const serviceBookingGlobalRoute = require('./serviceBookingGlobalRoute')
const serviceBookingDealerRoute = require('./serviceBookingDealerRoute')

router.use('/global', serviceBookingGlobalRoute)
router.use('/', serviceBookingDealerRoute)

module.exports = router
