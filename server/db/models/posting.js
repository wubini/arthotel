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
  status: {type: String, default: "unstarted", match: /(unstarted|started|pendingApproval|complete)/},
  date: { type: Date, default: Date.now },
  size: String,
  tags: [String],
  reviews: [{
    type: {type: String, enum: ['client', 'artist']},
    stars: {type: Number, enum: [1, 2, 3, 4, 5]},
    text: String
  }]
});

mongoose.model('Posting', schema);
