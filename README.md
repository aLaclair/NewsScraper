# NewsScrapr

## What is NewsScrapr?
NewsScrapr is an app that scrapes [USAToday's](https://www.usatoday.com/news) website for articles and saves them to a database. That information is then loaded on to the web page once the site is visited. You also have the ability to add or delete comments on each article.

## How was NewsScrapr created?
NewsScrapr is a Full-Stack Application that uses Node.js and Express.js for the server. All articles and comments are saved in a database using MongoDB, and using Mongoose to run queries against that database.

## What were some challenges when creating NewsScrapr?
NewsScrapr was a personal challenge for myself to test my understanding on MongoDB and Mongoose. Although these were new technologies to me at the time, having experience in MySQL made the logic easier. From using RESTful APIs in the past, MongoDB makes a lot more sense to me and is a very powerful database. Populating the article database with information from the comment database also provided it's own challenges.

## How do I use NewsScrapr?

All you have to do is visit [NewsScrapr](http://newsscrapr.thelaclair.com). If you would like to run this application or make changes locally, clone the repository and run npm install and you are all set!
