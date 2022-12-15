
const express = require('express')

const router = express.Router()
const controllerCreate = require('@controllers/web/service_statuses/controllerCreate')
const controllerUpdate = require('@controllers/web/service_statuses/controllerUpdate')
const controllerDelete = require('@controllers/web/service_statuses/controllerDelete')

const { accessTokenValid } = require("@middlewares/auth");

router.post('/service_status', accessTokenValid(), controllerCreate.create)
router.put('/service_status/:serviceStatusId', accessTokenValid(), controllerUpdate.update)
router.delete('/service_status/:serviceStatusId', accessTokenValid(), controllerDelete.delete)
module.exports = router
