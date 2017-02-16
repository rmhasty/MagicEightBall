var bodyParser = require('body-parser');
var answers = require('./answers.js');
var express = require('express');
var request = require('request');
var app = express();

var port = process.env.PORT || 3000;

var postOptions = {
  url: 'https://api.groupme.com/v3/bots/post',
  method: 'POST'
};

app.use(bodyParser.json());

app.route('/')
  .get(function(req, res) {
    sayBot(res);
    //res.end('Thanks');
  })
  .post(function(req, res) {
    if(req.body.name.toLowerCase().indexOf('8ball') < 0 && req.body.text.toLowerCase().indexOf('8ball') > -1) {
      setTimeout(sayBot(res), 4000);
    }else {
      res.send('Thanks');
    }
  });

function sayBot(res) {
  var botData = {
    bot_id: process.env.BOT_ID,
    text: answers[Math.floor(Math.random()*answers.length)]
  };
  postOptions.json = botData;
  request(postOptions, function(error, response, body) {
    res.end('Thanks');
  });
}

app.listen(port, function(){
  console.log('The magic happens on port ' + port);
});

exports.app = app;
