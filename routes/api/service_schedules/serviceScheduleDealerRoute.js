
const express = require('express')

const router = express.Router()
const controllerIndex = require('@controllers/web/service_schedules/controllerIndex')
const controllerCreate = require('@controllers/web/service_schedules/controllerCreate')
const controllerShow = require('@controllers/web/service_schedules/controllerShow')
const controllerUpdate = require('@controllers/web/service_schedules/controllerUpdate')
const controllerDelete = require('@controllers/web/service_schedules/controllerDelete')

const { accessTokenValid } = require("@middlewares/auth");

router.get('/service_schedules', accessTokenValid(), controllerIndex.index)
router.post('/service_schedule', accessTokenValid(), controllerCreate.create)
router.get('/service_schedule/:serviceScheduleId', accessTokenValid(), controllerShow.show)
router.put('/service_schedule/:serviceScheduleId', accessTokenValid(), controllerUpdate.update)
router.delete('/service_schedule/:serviceScheduleId', accessTokenValid(), controllerDelete.delete)
module.exports = router
