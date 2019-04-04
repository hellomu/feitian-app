const Router = require('koa-router')
const router = new Router()

const projectsController = require('../../app/controllers/projectsController')

router.get('/projects/get', projectsController.getProjects)

module.exports = router