const Router = require('koa-router')
const router = new Router()

const userController = require('../../app/controllers/usersController')

router.post('/users/phonevalid', userController.isPhoneUnique)
router.post('/users/register', userController.userRegister)
router.post('/user/login', userController.userLogin)

module.exports = router