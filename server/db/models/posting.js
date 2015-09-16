'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  client: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  artistsWhoSaved: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
  artistsWhoRequested: {type: [{type: Schema.Types.ObjectId, ref: 'User'}], default: []},
  artist: {type: Schema.Types.ObjectId, ref: 'User'},
  location: String,
  title: {type: String, required: true},
  description: String,
  photos: [String],
  status: {type: String, default: "unstarted", match: /(unstarted|started|complete)/},
  date: { type: Date, default: Date.now },
  size: String,
  tags: [String]
});

mongoose.model('Posting', schema);
