var bodyParser = require('body-parser');
var answers = require('./answers.js');
var express = require('express');
var request = require('request');
var app = express();

var port = process.env.PORT || 3000;
var triggers = ['magic eight ball', 'magic 8 ball'];

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
    if(isTriggered(text)) {
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

function isTriggered(text) {
  var loweredText = text.toLowerCase();
  for(var i = 0; i < triggers.length; i ++) {
    if(loweredText.indexOf(triggers[i]) > -1 ) {
      return true;
    }
  }
  return false;
}

app.listen(port, function(){
  console.log('The magic happens on port ' + port);
});

exports.app = app;
