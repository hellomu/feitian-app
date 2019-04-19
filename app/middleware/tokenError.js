const jwt = require('jsonwebtoken')
const config = require('../../config')
const util = require('util')
const verify = util.promisify(jwt.verify)

module.exports = function () {
    return async function (ctx, next) {
        return next().catch((err) => {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = 'Protected resource, use Authorization header to get access\n';
            } else {
                throw err;
            }
        })
    }
}