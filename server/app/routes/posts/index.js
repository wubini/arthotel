var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

router.get('/', function(req, res, next)
{
  Post.find()
  .then(function(posts)
  {
    res.send(posts);
  });
});

router.use('/:postId', function(req, res, next)
{
  Post.findById(req.params.postId)
  .populate()
  .then(function(post)
  {
    req.post = post;
    next();
  })
  .then(null, next);
});

router.get('/:postId', function(req, res, next)
{
  res.send(req.post);
});
