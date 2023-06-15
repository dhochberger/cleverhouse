const Router = require('express')
const UserDevicesController = require('../controllers/UserDevicesController')
const passport = require('../config/passport')
const Util = require('../utils/Utils')
const util = new Util()

const router = Router()

router.get('/favicon.ico', (req, res) => res.status(204))

router.get('/', passport.authorized, UserDevicesController.getAllUserDevices)
router.get('/me', passport.authorized, UserDevicesController.getAllUserDevicesForMe)
router.get('/:id', passport.authorized, UserDevicesController.getUserDevices)
router.post('/', passport.authorized, UserDevicesController.addUserDevices)
router.put('/:id', passport.authorized, UserDevicesController.updateUserDevices)
router.delete('/', passport.authorized, (req, res) => {
    util.setError(400, `Please provide an id`)
    return util.send(res)
})
router.delete('/:id', passport.authorized, UserDevicesController.deleteUserDevices)

module.exports = router
