var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  code: {type: String, required: true},
  startDate: {type: Date, default: Date.now},
  expireDate: Date,
  user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  discount: {type: Number, required: true}
});

mongoose.model('Promo', schema);
