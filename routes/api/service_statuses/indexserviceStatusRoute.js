
const express = require('express')

const router = express.Router()
const serviceStatusRoute = require('./serviceStatusGlobalRoute')
const serviceStatusDealerRoute = require('./serviceStatusDealerRoute')

router.use('/global', serviceStatusRoute)
router.use('/', serviceStatusDealerRoute)

module.exports = router
