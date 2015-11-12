#!/usr/bin/env node
'use strict'

var cors = require('cors')
var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')

if (!process.env.DB_URL) {
  throw new Error('Required environment variable DB_URL is unset')
}

var app = express()
app.use(cors())
app.use(bodyParser.json())

var db = {
  url: process.env.DB_URL,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
}

app.all('*', function (req, res) {
  var opts = {
    uri: db.url + req.url,
    method: req.method
  }

  if (req.body && Object.keys(req.body).length) {
    opts.json = true
    opts.body = req.body
  }

  if (db.username && db.password) {
    opts.auth = {
      user: db.username,
      pass: db.password
    }
  }

  req.pipe(request(opts)).pipe(res)
})

app.listen(process.env.PORT || 3000)
