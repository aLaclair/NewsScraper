const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')
const bodyParser = require('body-parser')

let PORT = process.env.PORT || 3000

const app = express()

let db = require('./models')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/scrape', function(req, res) {
    axios.get('https://www.usatoday.com/news/').then(function(response) {
        let $ = cheerio.load(response.data)

        $('.gnt_m_flm .gnt_m_flm_a').each(function(i, element) {
            let result = {}

            if ($(this).text() !== undefined) {
                result.title = $(this).text()
            }

            if ($(this).attr('data-c-br') !== undefined) {
                result.summary = $(this).attr('data-c-br')
            }
            if ($(this).attr('href') !== undefined) {
                result.link = $(this).attr('href')
            }
            console.log(result)
            db.Article.create({
                title: result.title,
                summary: result.summary,
                link: result.link
            }).then(function(art) {
                console.log(art)
            }).catch(function(err) {
                console.log(err)
            })
        })
        res.send('Scrape')
    })
})

app.get('/articles',function(req, res) {
    db.Article.find({}).then(function(articles) {
        res.json(articles)
    }).catch(function(err) {
        res.json(err)
    })
})
app.get('/comments',function(req,res) {
    db.Comments.find({}).then(function(comment) {
        res.json(comment)
    }).catch(function(err) {
        res.json(err)
    })
})
app.get('/delete/:id', function(req,res) {
    db.Comments.findOneAndDelete({_id: req.params.id}).then(function(data) {
        res.json(data)
    })
})
app.post("/articles/:id", function(req, res) {
    console.log(req.body)
    console.log(req.params.id)
    db.Comments.create(req.body).then(function(dbComment) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: { comments: dbComment._id }}, { new: true })
    }).then(function(dbArticle) {
        res.json(dbArticle)
    }).catch(function(err) {
        res.send(err)
    })

  });
  app.get('/both',function(req,res){
    db.Article.find({}).populate('comments')
    .then(function(article) {
        res.json(article)
    })
})

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articlesDB"

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

app.listen(PORT, function() {
    console.log(`App on https://localhost:${PORT}`)
})