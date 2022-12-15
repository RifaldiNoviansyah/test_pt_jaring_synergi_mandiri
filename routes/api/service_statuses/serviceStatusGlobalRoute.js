
const express = require('express')

const router = express.Router()
const controllerIndex = require('@controllers/web/service_statuses/controllerIndex')
const controllerShow = require('@controllers/web/service_statuses/controllerShow')

router.get('/service_statuses', controllerIndex.index)
router.get('/service_status/:serviceStatusId',  controllerShow.show)

module.exports = router
