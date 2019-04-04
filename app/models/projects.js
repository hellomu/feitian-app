// 引入mongoose
const mongoose = require('mongoose')

// 获取Schema对象
const Schema = mongoose.Schema

// 创建Schema对象的实例
const projectsSchema = new Schema({
    actors : {
        type: String,
        required: false
    },
    business : {
        type: Number,
        required: false
    },
    categoryid  : {
        type: Number,
        required: false
    },
    categoryname  : {
        type: String,
        required: false
    },
    cityid  : {
        type: Number,
        required: true
    },
    cityname : {
        type: String,
        required: false
    },
    description : {
        type: String,
        required: false
    },
    id : {
        type: String,
        required: true
    },
    imgurl : {
        type: String,
        required: false
    },
    iseticket : {
        type: Number,
        required: false
    },
    isgeneralagent : {
        type: Number,
        required: false
    },
    issuperticket : {
        type: Number,
        required: false
    },
    isxuanzuo  : {
        type: Number,
        required: false
    },
    name : {
        type: String,
        required: false
    },
    nameNoHtml : {
        type: String,
        required: false
    },
    price : {
        type: Number,
        required: false
    },
    price_str : {
        type: String,
        required: false
    },
    pricehigh : {
        type: Number,
        required: false
    },
    projectid : Schema.Types.Mixed,
    showstatus : {
        type: String,
        required: false
    },
    showtag : {
        type: String,
        required: false
    },
    showtime : {
        type: String,
        required: false
    },
    sitestatus : {
        type: Number,
        required: false
    },
    subcategoryid : {
        type: Number,
        required: false
    },
    subcategoryname : {
        type: String,
        required: String
    },
    subhead : {
        type: String,
        required: false
    },
    venue : {
        type: String,
        required: false
    },
    venuecity : {
        type: String,
        required: false
    },
    venueid : {
        type: Number,
        required: false
    },
    venueid: {
        type: String,
        required: false
    },
    favourable : {
        type: Array,
        required: false
    },
},{
    collection: 'projects',
    versionKey: false
})

// 把shema对象作为表结构引出去
module.exports = mongoose.model('projects', projectsSchema)