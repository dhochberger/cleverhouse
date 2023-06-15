const Router = require('express')
const UserController = require('../controllers/UserController')
const passport = require('../config/passport')
const router = Router()

router.get('/favicon.ico', (req, res) => res.status(204))

router.get('/', passport.authorized, UserController.get_all_users)
router.get('/me', passport.authorized, UserController.get_self)
router.get('/:id', passport.authorized, UserController.get_user)

//router.post('/', UserController.addUser)
router.put('/me', passport.authorized, UserController.update_self)
router.delete('/me', passport.authorized, UserController.delete_self)

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/disconnect', UserController.disconnect)
router.post('/refreshtoken', passport.authorized, UserController.refresh_token)

module.exports = router
