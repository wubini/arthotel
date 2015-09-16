var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Posting = mongoose.model('Posting');

router.get('/', (req, res, next) => {
  User.find()
    .then(posts => res.send(posts))
});

router.use('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      req.foundUser = user;
      next();
    })
    .then(null, next);
});

router.get('/:userId', (req, res, next) => {
  res.send(req.foundUser);
});
router.get(`:userId/postings/done`, (req, res, next) => {
  Posting.find()
    .where({status: 'complete'})
    .populate('artist')
    .then(postings => res.send(postings))
    .then(null, next);
});

//TODO -- check if these need to use the userId that is passed in.
// could need to wait till we can pass this information.
router.get('/:userId/saved', (req, res, next) => {
  Posting.find()
    .where({artistsWhoSaved: req.foundUser._id})
    .populate('client')
    .then(postings => res.send(postings));
});

router.get('/:userId/postings', (req, res, next) => {
  Posting.find()
    .where({client: req.params.userId})
    .populate("artistsWhoRequested")
    .then(postings => res.send(postings))
    .then(null, next);
});

router.get('/:userId/requested', (req, res, next) => {
  Posting.find()
  .where({artistsWhoRequested: req.foundUser._id})
  .populate('client')
  .then(postings => res.send(postings));
});
