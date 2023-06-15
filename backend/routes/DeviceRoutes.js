const Router = require('express')
const DeviceController = require('../controllers/DeviceController')
const passport = require('../config/passport')
const Util = require('../utils/Utils')
const util = new Util()

const router = Router()

router.get('/favicon.ico', (req, res) => res.status(204))

router.get('/', passport.authorized, DeviceController.get_all_devices)
router.get('/:id', passport.authorized, DeviceController.get_device)
router.post('/', passport.authorized, DeviceController.add_device)
router.delete('/', (req, res) => {
    util.setError(400, `Please provide an id`)
    return util.send(res)
})
router.delete('/:id', passport.authorized, DeviceController.delete_device)

module.exports = router
