var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next)
{
  User.find()
  .then(function(posts)
  {
    res.send(posts);
  });
});
