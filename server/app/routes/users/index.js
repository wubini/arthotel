var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Posting = mongoose.model('Posting');

router.get('/', (req, res, next) => {
  User.find()
    .then(posts => res.send(posts));
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

router.put('/:userId', (req, res, next) => {
  for(var key in req.body.user)
  {
    req.foundUser[key] = req.body.user[key];
  }
  req.foundUser.save()
  .then(function(user)
  {
    res.send(user);
  });
});

router.get('/:userId/postings/done', (req, res, next) => {
  Posting.find()
    .where({client: req.params.userId, status: 'complete'})
    .populate('artist')
    .then(postings => {
      res.send(postings);
    })
    .then(null, () => {
      console.log('could not find any!');
      next();
    });
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
  .where('artistsWhoRequested')
  .elemMatch({user: req.params.userId})
  .populate('client')
  .then(postings => res.send(postings));
});

router.get('/:userId/unassigned', (req, res, next) => {
  Posting.find({client:req.foundUser._id, artist: {$exists: false}})
  .populate('artistsWhoRequested')
  .then(postings => {
    console.log(postings);
    res.send(postings);
  })
  .then(null, next);
});

router.get('/:userId/active/artist', function(req, res, next){
  Posting.find({artist: req.foundUser._id, status:{$in:['started', 'pendingApproval']} })
  .populate('client')
  .then(postings => res.send(postings));
});

router.get('/:userId/active/client', function(req, res, next){
  Posting.find({client: req.foundUser._id, artist: {$exists: true}, status:{$in:['started', 'pendingApproval']}})
  .populate('artist')
  .then(function(postings){
    res.send(postings);
  });
});
