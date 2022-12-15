
const express = require('express')

const router = express.Router()
const controllerCreate = require('@controllers/web/service_bookings/controllerCreate')

router.post('/service_booking', controllerCreate.create)
module.exports = router
