var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Posting = mongoose.model('Posting');
mongoose.Promise = require('bluebird');
var _ = require('lodash');

router.get('/', (req, res, next) => {
  User.find()
  // .then(users => {
  //   var promisedRatedUsers = getPromisesForRatedUsers(users);
  //   return Promise.all(promisedRatedUsers)
  // })
  .then(users => {res.send(users)});
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

router.get('/:userId/postings/done/:role', (req, res, next) => {
  var role = req.param.role;
  var conditions = {
    status: "complete"
  };
  conditions[role] = req.foundUser._id;
  Posting.find(conditions)
  .then(postings => {
    res.send(postings);
  });
});

function getPromisesForRatedUsers(users)
{
  return users.map(user => {
    var userCopy ={};
    _.assign(userCopy, user._doc);
    return user.getRating('artist')
    .then(rating => {
      userCopy.artistRating = rating;
      return user;
    })
    .then(user => {
      return user.getRating('client')
      .then(rating => {
        userCopy.clientRating = rating;
        return userCopy;
      })
    })
  });
}
