
const express = require('express')

const router = express.Router()
const controllerIndex = require('@controllers/web/service_schedules/controllerIndexNextDay')

router.get('/service_schedules', controllerIndex.index)
module.exports = router
