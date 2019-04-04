const userList = require('../models/users')
const passwordList = require('../models/passwords')
const uuidv1 = require('uuid/v1')
const passport = require('../utils/passport')
const config = require('../../config')

// 注册
// blur时检验手机号码重复性
const isPhoneUnique = async(ctx, next) => {
    const req = ctx.request.body
    const phone = req.phone
    const isPhoneExists = userList.findOne({
        phone,
    }, {
        phone: 1
    })
    ctx.status = 200
    if (isPhoneExists) {
        ctx.body = {
            code: 0,
            msg: 'The phone number is exists'
        }
        return
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
            const {password_hash, salt} = passwordCoup
            const isRegister = await passwordList.create({
                userId,
                password_hash,
                salt
            })
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

module.exports = {
    isPhoneUnique,
    userRegister
}