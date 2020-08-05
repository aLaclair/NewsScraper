const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')

let PORT = process.env.PORT || 3000

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, function() {
    console.log(`App on https://localhost:${PORT}`)
})