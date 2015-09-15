var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
console.log("Posts model in router", Post);

router.get('/', function(req, res, next)
{
  console.log("requesting all posts");
  Post.find()
  .then(function(posts)
  {
    res.send(posts);
  });
});
