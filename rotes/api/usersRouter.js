const Router = require('koa-router')
const router = new Router()

const userController = require('../../app/controllers/usersController')

router.post('/user/accountvalid', userController.isaccountUnique)
router.post('/user/register', userController.userRegister)
router.post('/user/login', userController.userLogin)

module.exports = router