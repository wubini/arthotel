var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Posting = mongoose.model('Posting');

router.get('/', function(req, res, next)
{
  Posting.find()
  .then(function(postings)
  {
    res.send(postings);
  });
});

router.use('/:postingId', function(req, res, next)
{
  Posting.findById(req.params.postingId)
  .populate('client')
  .then(function(posting)
  {
    req.posting = posting;
    next();
  })
  .then(null, next);
});

router.get('/:postingId', function(req, res, next)
{
  res.send(req.posting);
});
