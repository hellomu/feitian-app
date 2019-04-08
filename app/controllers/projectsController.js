const projectsList = require('../models/projects')

const getProjects = async (ctx, next) => {
    const req = ctx.request.body
    const type = req.type
    const projects = await projectsList.find({isgeneralagent:type}, {_id:0})
    ctx.status = 200
    ctx.body = {
        msg: 'get request!!',
        data: {
            data: req,
            projects
        }
    }
}

module.exports = {
    getProjects
}