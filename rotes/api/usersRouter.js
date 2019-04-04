const Router = require('koa-router')
const router = new Router()

const userController = require('../../app/controllers/usersController')

router.post('/users/phonevalid', userController.isPhoneUnique)
router.post('/users/register', userController.userRegister)

module.exports = router