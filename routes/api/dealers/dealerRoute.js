
const express = require('express')

const router = express.Router()
const controllerIndex = require('@controllers/web/dealers/controllerIndex')
const controllerCreate = require('@controllers/web/dealers/controllerCreate')
const controllerShow = require('@controllers/web/dealers/controllerShow')
const controllerUpdate = require('@controllers/web/dealers/controllerUpdate')
const controllerDelete = require('@controllers/web/dealers/controllerDelete')

router.get('/dealers', controllerIndex.index)
router.post('/dealer', controllerCreate.create)
router.get('/dealer/:dealerId', controllerShow.show)
router.put('/dealer/:dealerId', controllerUpdate.update)
router.delete('/dealer/:dealerId', controllerDelete.delete)
module.exports = router
