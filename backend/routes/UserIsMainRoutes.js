const Router = require('express')
const UserIsMainController = require('../controllers/UserIsMainController')
const passport = require('../config/passport')
const Util = require('../utils/Utils')
const util = new Util()

const router = Router()

router.get('/favicon.ico', (req, res) => res.status(204))

router.get('/', passport.authorized, UserIsMainController.get_all_user_is_main)
router.get('/me', passport.authorized, UserIsMainController.get_all_user_is_main_for_me)
router.get('/houses/:id', passport.authorized, UserIsMainController.get_house_user_is_main)
router.get('/:id', passport.authorized, UserIsMainController.get_user_is_main)
router.post('/', passport.authorized, UserIsMainController.add_user_is_main)
router.put('/:id', passport.authorized, UserIsMainController.update_user_is_main)
router.delete('/', passport.authorized, (req, res) => {
    util.setError(400, `Please provide an id`)
    return util.send(res)
})
router.delete('/:id', passport.authorized, UserIsMainController.delete_user_is_main)

module.exports = router
