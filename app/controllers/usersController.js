const userList = require('../models/users')
const passwordList = require('../models/passwords')
const uuidv1 = require('uuid/v1')
const jwt = require('jsonwebtoken')
const passport = require('../utils/passport')
const config = require('../../config')

// 登录注册时验证手机
// blur时检验手机号码重复性
const isaccountUnique = async (ctx, next) => {
    const req = ctx.request.body
    const account = req.account
    if (account) {
        const isaccountExists = await userList.findOne({
            account,
        }, {
                account: 1
            }, function (err, doc) {
                return doc
            })
        ctx.status = 200
        if (!isaccountExists) {
            ctx.body = {
                code: 1,
                msg: 'The account number can register'
            }
            return
        }
        ctx.body = {
            code: 0,
            msg: '账号已存在'
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '账号不能为空'
        }
    }
}
// 提交保存
const userRegister = async (ctx, next) => {
    const req = ctx.request.body
    if (req.account && req.password) {
        const { account, password } = req
        const userId = uuidv1()
        const isNewUser = await userList.create({
            userId,
            account,
            wechat: req.wechat || ''
        })
        if (isNewUser) {
            const passwordCoup = await passport.enctypt(password, config.saltRounds)
            const { hash, salt } = passwordCoup
            const isRegister = await passwordList.create({
                userId,
                hash,
                salt
            })
            ctx.status = 200
            if (isRegister) {
                const token = await jwt.sign({
                    userId,
                    account
                }, config.secret, {
                        issuer: config.issuer,
                        expiresIn: config.tokenExpiresTime
                    })
                ctx.body = {
                    code: 1,
                    msg: 'success',
                    data: {
                        userId,
                        account: req.account,
                        token
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
            msg: 'Missing account or password'
        }
    }
}

// 更新

// 登录

const userLogin = async ctx => {
    const req = ctx.request.body
    const { account, password } = req
    if (account && password) {
        const loginUser = await userList.findOne({
            account
        }, function (err, doc) {
            return doc
        })
        if (loginUser) {
            const userId = loginUser.userId
            if (userId) {
                const passwordData = await passwordList.findOne({
                    userId
                }, function (err, doc) {
                    return doc
                })
                ctx.status = 200
                if (passwordData) {
                    const salt = passwordData.salt
                    const hash = passport.checkPassword(password, salt)
                    if (hash === passwordData.hash) {
                        const token = await jwt.sign({
                            userId,
                            account,
                            wechat: loginUser.wechat
                        }, config.secret, {
                                issuer: config.issuer,
                                expiresIn: config.tokenExpiresTime
                            })
                        ctx.body = {
                            code: 1,
                            msg: 'login success',
                            data: {
                                account: passwordData.account,
                                userId: passwordData.userId,
                                token
                            }
                        }
                    } else {
                        ctx.body = {
                            code: 0,
                            msg: '账号或密码错误'
                        }
                    }
                } else {
                    ctx.body = {
                        code: 0,
                        msg: '账号无效'
                    }
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: '账号无效'
                }
            }
        } else {
            ctx.body = {
                code: 0,
                msg: "账号或密码错误"
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "账号或密码为空"
        }
    }
}

module.exports = {
    isaccountUnique,
    userRegister,
    userLogin
}