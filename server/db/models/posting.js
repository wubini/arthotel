'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  client: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  location: String,
  title: {type: String, required: true},
  description: String,
  photos: [String],
  status: {type: String, default: "private", match: /(private|public)/},
  date: { type: Date, default: Date.now }
});

mongoose.model('Posting', schema);
