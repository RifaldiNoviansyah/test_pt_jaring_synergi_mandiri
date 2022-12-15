
const express = require('express')

const router = express.Router()
const serviceStatusRoute = require('./serviceScheduleGlobalRoute')
const serviceStatusDealerRoute = require('./serviceScheduleDealerRoute')

router.use('/global', serviceStatusRoute)
router.use('/', serviceStatusDealerRoute)

module.exports = router
