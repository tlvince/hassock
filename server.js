'use strict';

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');

if (!process.env.DB_URL) {
  throw new Error('Required environment variable DB_URL is unset');
}

var app = express();
app.use(cors());
app.use(bodyParser.json());

var db = {
  url: process.env.DB_URL,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
};

var user = {
  roles: process.env.USER_ROLES.split(',') || [],
  group: process.env.USER_GROUP || ''
};

app.put('/users/:id', function(req, res) {
  var url = [
    db.url,
    '/_users/org.couchdb.user:',
    req.params.id
  ].join('');

  var User = {
    name: req.body.username,
    password: req.body.password,
    roles: [].concat(user.roles),
    type: 'user'
  };

  if (req.body[user.group]) {
    User.roles.push(user.group + '/' + req.body[user.group]);
  }

  var opts = {
    body: JSON.stringify(User)
  };

  if (db.username && db.password) {
    opts.auth = {
      user: db.username,
      pass: db.password
    };
  }

  req.pipe(request.put(url, opts)).pipe(res);
});

app.listen(process.env.PORT || 3000);
