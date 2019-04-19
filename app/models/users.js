const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        require: true
    },
    account: {
        type: String,
        unique: true,
        require: true
    },
    wechat: {
        type: String
    },
    coupons: {
        type: String
    }
},{
    collection: 'users',
    versionKey: false
})

module.exports = mongoose.model('users', usersSchema)