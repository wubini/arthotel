var router = require('express').Router();
module.exports = router;
var Post = require('../../../db/models').Post;

router.use('/', function(req, res, next)
{
  console.log("requesting all posts");
  Post.find()
  .then(function(posts)
  {
    res.send(posts);
  });
});
