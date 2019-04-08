const mongoose = require('mongoose')
const Schema = mongoose.Schema

const passwordsSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        require: true
    },
    hash: {
        type: String,
        require: true
    },
    salt: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('passwords', passwordsSchema)