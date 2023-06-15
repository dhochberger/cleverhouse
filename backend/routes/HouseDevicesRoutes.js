const Router = require('express')
const HouseDevicesController = require('../controllers/HouseDevicesController')
const passport = require('../config/passport')
const Util = require('../utils/Utils')
const util = new Util()

const router = Router()

router.get('/favicon.ico', (req, res) => res.status(204))

router.get('/', passport.authorized, HouseDevicesController.getAllHouseDevices)
router.get('/:id', passport.authorized, HouseDevicesController.getHouseDevices)
router.post('/', passport.authorized, HouseDevicesController.addHouseDevices)
router.put('/:id', passport.authorized, HouseDevicesController.updateHouseDevices)
router.delete('/', (req, res) => {
    util.setError(400, `Please provide an id`)
    return util.send(res)
})
router.delete('/:id', passport.authorized, HouseDevicesController.deleteHouseDevices)

module.exports = router
