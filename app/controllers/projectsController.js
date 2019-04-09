const projectsList = require('../models/projects')

const getProjects = async (ctx, next) => {
    const req = ctx.request.query
    const type = req.type
    const obj = {}
    if (type) {
        obj.isgeneralagent = type
    }
    const curPage = req.curpage || 1
    const pageSize = req.pageSize || 10
    const skipSize = curPage *pageSize-10
    const totalSize = await projectsList.find(obj, {_id:1}).countDocuments()
    const totalPage = Math.ceil(totalSize/pageSize)
    const projects = await projectsList.find(obj, {_id:0}).limit(pageSize).skip(skipSize)
    ctx.status = 200
    ctx.body = {
        msg: 'get request!!',
        data: {
            page: {pageSize, curPage, totalSize, totalPage},
            projects
        }
    }
}

module.exports = {
    getProjects
}