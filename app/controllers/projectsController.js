const projectsList = require('../models/projects')
// const tokenValid = require('../utils/tokenValid')

const getProjects = async (ctx, next) => {
    const req = ctx.request.query
    // const token = ctx.request.header.access_token
    // if (token) {
    //     let authority = tokenValid.decodeToken(token)
    //     console.log('authority', authority, authority.exp)
    //     if (authority && authority.exp <= parseInt(new Date())) {
    //         ctx.body = {
    //             coe: 3,
    //             msg: 'Token fails!'
    //         }
    //         return
    //     }
    // } else {
    //     ctx.body = {
    //         code: 0,
    //         msg: '没有token'
    //     }
    //     return
    // }
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