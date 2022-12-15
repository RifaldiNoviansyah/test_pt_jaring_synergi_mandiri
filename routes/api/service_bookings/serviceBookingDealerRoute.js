
const express = require('express')

const router = express.Router()
const controllerIndex = require('@controllers/web/service_bookings/controllerIndex')
const controllerCreate = require('@controllers/web/service_bookings/controllerCreate')
const controllerShow = require('@controllers/web/service_bookings/controllerShow')
const controllerUpdate = require('@controllers/web/service_bookings/controllerUpdate')
const controllerDelete = require('@controllers/web/service_bookings/controllerDelete')
const controllerServiceStatusUpdate = require('@controllers/web/service_bookings/controllerServiceStatusUpdate')

const { accessTokenValid } = require("@middlewares/auth");

router.get('/service_bookings', accessTokenValid(), controllerIndex.index)
router.post('/service_booking', accessTokenValid(), controllerCreate.create)
router.get('/service_booking/:serviceBookingId', accessTokenValid(), controllerShow.show)
router.put('/service_booking/:serviceBookingId', accessTokenValid(), controllerUpdate.update)
router.put('/service_booking/:serviceBookingId/status_service/:serviceStatusId', accessTokenValid(), controllerServiceStatusUpdate.update)
router.delete('/service_booking/:serviceBookingId', accessTokenValid(), controllerDelete.delete)
module.exports = router
