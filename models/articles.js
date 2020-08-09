const mongoose = require('mongoose')

let Schema = mongoose.Schema

const articleSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    summary: {
        type: String,
        unique: true,
        required: true,
    },
    link: {
        type: String,
        unique: true,
        required: true,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ]
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article