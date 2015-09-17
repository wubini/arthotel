// 'use strict';
// var crypto = require('crypto');
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// var schema = new mongoose.Schema({
//   client: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//   artist: {type: Schema.Types.ObjectId, ref: 'User', required: true},
//   posting: {type: Schema.Types.ObjectId, ref: 'Posting', required: true},
//   photos: [String],
//   status: {type: String, match: /(artist-int|artist-req|client-req|in-progress|complete|abandoned)/},
//   startDate: { type: Date, default: Date.now },
//   completeDate: Date,
//   paymentAmount: Number,
//   clientReview: String,
//   artistReview: String
// });
//
// mongoose.model('Partnership', schema);
