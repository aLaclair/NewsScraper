const mongoose = require('mongoose')

const Schema = mongoose.Schema

let commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    }
})

const comments = mongoose.model('Comments', commentSchema)

module.exports = comments