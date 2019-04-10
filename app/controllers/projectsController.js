const projectsList = require('../models/projects')
const tokenContro = require('../utils/tokencontroll')

const getProjects = async (ctx, next) => {
    const req = ctx.request.query
    const tokens = ctx.request.header.authorization
    if (tokens) {
        let authority = tokenContro.tokenValid(tokens)
        console.log('authority', authority)
        // if (authority && authority.exp <= new Date()/1000) {
        //     ctx.body = {
        //         coe: 3,
        //         msg: 'Token fails!'
        //     }
        //     return
        // }

    } else {
        ctx.body = {
            code: 0,
            msg: '没有token'
        }
        return
    }
    const type = req.type
    const obj = {}
    if (type) {
        obj.isgeneralagent = type
    }
    const curPage = Number(req.curPage) || 1
    const pageSize = Number(req.pageSize) || 10
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