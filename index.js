var express = require('express')
var dictionary = require('./dictionary.json')
var app = express()
var { senteces } = dictionary;
app.get('/', function(req, res) {
  var random = Math.floor(Math.random() * 100)
  res.json(senteces[random])
})

app.listen(3000)
