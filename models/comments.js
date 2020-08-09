const mongoose = require('mongoose')

const Schema = mongoose.Schema

let commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    }
})

const Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments