var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  code: {type: String, required: true},
  createDate: {type: Date, default: Date.now},
  expireDate: Date,
  user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  discount: Number
});

mongoose.model('Promo', schema);
