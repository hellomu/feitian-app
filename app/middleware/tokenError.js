const jwt = require('jsonwebtoken')
const config = require('../../config')
const util = require('util')
const verify = util.promisify(jwt.verify)

module.exports = function() {
    return async function (ctx, next) {
        try {
            const token = ctx.header.Authorization
            if (token) {
                try {
                    let payload = await verify(token.split(' ')[1], config.secret)
                    ctx.user = {
                        name: payload.phone,
                        id: payload.userId
                    }
                } catch (err) {
                    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
                        ctx.status = 401
                        ctx.body = {
                            cuccess:0,
                            message: '401 用户未登录'
                        }
                        return
                    }
                }
            }
            await next()
        } catch (err) {
            if (err.status === 401) {
                ctx.status = 401
                ctx.body = {
                    cuccess:0,
                    message: '401 用户未登录'
                }
            } else {
                err.status = 404
                ctx.body = {
                    success: 0,
                    message: '404'
                }
            }
        }
    }
}