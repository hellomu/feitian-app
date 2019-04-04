const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        require: true
    },
    password_Hash: {
        type: String,
        require: true
    },
    salt: {
        type: String,
        require: true
    }
})