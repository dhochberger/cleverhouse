const Router = require('express')
const HouseController = require('../controllers/HouseController')
const passport = require('../config/passport')
const Util = require('../utils/Utils')
const util = new Util()

const router = Router()

router.get('/favicon.ico', (req, res) => res.status(204))

router.get('/', passport.authorized, HouseController.get_all_houses)
router.get('/:id', passport.authorized, HouseController.get_house)
router.post('/', passport.authorized, HouseController.add_house)
router.put('/:id', passport.authorized, HouseController.update_house)
router.delete('/', (req, res) => {
    util.setError(400, `Please provide an id`)
    return util.send(res)
})
router.delete('/:id', passport.authorized, HouseController.delete_house)

module.exports = router
