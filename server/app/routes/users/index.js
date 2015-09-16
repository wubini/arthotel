var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Posting = mongoose.model('Posting');

router.get('/', function(req, res, next) {
  User.find()
    .then(function(posts) {
      res.send(posts);
    });
});

router.use('/:userId', function(req, res, next) {
  User.findById(req.params.userId)
    .then(function(user) {
      req.foundUser = user;
      next();
    })
    .then(null, next);
});

router.get('/:userId', function(req, res, next) {
  res.send(req.foundUser);
});

router.get('/:userId/saved', function(req, res, next) {
  Posting.find().where({
      artistsWhoSaved: req.foundUser._id
    })
    .then(function(postings) {
      res.send(postings);
    });
});

router.get('/:userId/postings', function(req, res, next) {
  Posting.find().where({
      client: req.params.userId
    }).populate("artistsWhoRequested")
    .then(function(postings) {
      res.send(postings);
    }).then(null, next);
});

router.get('/:userId/requested', function(req, res, next) {
  Posting.find().where({
      artistsWhoRequested: req.foundUser._id
    })
    .then(function(postings) {
      res.send(postings);
    });
});
