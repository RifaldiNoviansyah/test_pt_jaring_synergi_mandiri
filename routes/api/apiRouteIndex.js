const express = require("express");
const router = express.Router();

// global
const indexserviceStatusRoute = require('./service_statuses/indexserviceStatusRoute')
const indexserviceScheduleRoute = require('./service_schedules/indexserviceScheduleRoute')
const indexserviceBookingRoute = require('./service_bookings/indexserviceBookingRoute')
const indexDealerRoute = require('./dealers/indexDealerRoute')

router.use('/web', indexserviceStatusRoute)
router.use('/web', indexserviceScheduleRoute)
router.use('/web', indexserviceBookingRoute)
router.use('/web', indexDealerRoute)

module.exports = router;