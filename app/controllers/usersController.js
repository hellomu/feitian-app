const userList = require('../models/users')
const passwordList = require('../models/passwords')
const uuidv1 = require('uuid/v1')
const jwt = require('jsonwebtoken')
const passport = require('../utils/passport')
const config = require('../../config')

// 登录注册时验证手机
// blur时检验手机号码重复性
const isPhoneUnique = async(ctx, next) => {
    const req = ctx.request.body
    const phone = req.phone
    if (phone) {
        const isPhoneExists = userList.findOne({
            phone,
        }, {
            phone: 1
        })
        ctx.status = 200
        if (!isPhoneExists) {
            ctx.body = {
                code: 0,
                msg: 'The phone number is exists'
            }
            return
        }
        ctx.body = {
            code: 1,
            msg: 'The phone number can register'
        }
    } else {
        ctx.body = {
            code: 0,
            msg: 'phone number cannot be empty'
        }
    }
}
// 提交保存
const userRegister = async (ctx, next) => {
    const req = ctx.request.body
    if (req.phone && req.password) {
        const userId = uuidv1()
        const isNewUser = await userList.create({
            userId,
            phone: req.phone,
            wechat: req.wechat || ''
        })
        if (isNewUser) {
            const password = req.password
            const passwordCoup = await passport.enctypt(password, config.saltRounds)
            const {hash, salt} = passwordCoup
            const isRegister = await passwordList.create({
                userId,
                hash,
                salt
            })
            ctx.status = 200
            if (isRegister) {
                ctx.body = {
                    code: 1,
                    msg:'success',
                    data: {
                        userId,
                        phone: req.phone
                    }
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: 'faild'
                }
            }
        } else {
            ctx.body = {
                code: 0,
                msg: 'Network fluctuation, please try again'
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: 'Missing phone or password'
        }
    }
}

// 更新

// 登录

const userLogin = async ctx => {
    const req = ctx.request.body
    const {phone, password} = req
    if (phone && password) {
        const loginUser = await userList.findOne({
            phone
        })
        if (loginUser) {
            const userId = loginUser.userId
            if (userId) {
                const passwordData = await passwordList.findOne({
                    userId
                })
                ctx.status = 200
                if (passwordData) {
                    const salt = passwordData.salt
                    const hash = passport.checkPassword(password, salt)
                    if (hash === passwordData.hash) {
                        const token = jwt.sign({
                            userId,
                            phone,
                            wechat:loginUser.wechat
                        }, config.secret, {
                            issuer: config.issuer,
                            expiresIn: config.tokenExpiresTime
                        })
                        ctx.body = {
                            code: 1,
                            msg: 'login success',
                            phone: passwordData.phone,
                            userId: passwordData.userId,
                            token
                        }
                    } else {
                        ctx.body = {
                            code: 0,
                            msg: 'the password is false'
                        }
                    }
                } else {
                    ctx.body = {
                        code: 0,
                        msg: 'the account is invalid'
                    }
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: 'the account is invalid'
                }
            }
        } else {
            ctx.body = {
                code: 2,
                msg:"account is no exsists"
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "account or password number is empty"
        }
    }
}

module.exports = {
    isPhoneUnique,
    userRegister,
    userLogin
}