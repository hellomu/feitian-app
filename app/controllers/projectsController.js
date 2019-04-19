const projectsList = require('../models/projects')
// const tokenValid = require('../utils/tokenValid')

const getProjects = async (ctx, next) => {
    const req = ctx.request.query
    const type = req.type
    const cityname = req.cityname
    const name = req.name
    const obj = {}
    if (type) {
        obj.isgeneralagent = type
    }
    cityname && (obj.cityname = cityname)
    if (name) {
        obj.$or = []
        let arr = ['name', 'nameNoHtml', 'description', 'cityname', 'venuecity']
        arr.forEach(element => {
            let query = {}
            query[element] = new RegExp(name,'i')
            obj.$or.push(query)
        })
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