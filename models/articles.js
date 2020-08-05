const mongoose = require('mongoose')

let Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        unique: true,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }
})

const article = mongoose.model('Article', articleSchema)

module.exports = article