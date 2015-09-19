var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Posting = mongoose.model('Posting');
var _ = require('lodash');
mongoose.Promise = require('bluebird');

var userIdString;

router.use(function(req, res, next){
  if(req.user){
     userIdString = req.user._id.toString();
  }
   next();
});

router.get('/', function(req, res, next) {
  Posting.find()
    .populate('client')
    .then(function(postings) {
      res.send(postings);
    });
});

router.put('/', function(req, res, next) {
  var savePromises = [];
  Posting.find()
    .where({
      _id: {
        $in: req.session.cart
      }
    })
    .then(function(postings) {
      postings.forEach(posting => {
        if (posting.artistsWhoSaved.indexOf(req.user._id) < 0) {
          posting.artistsWhoSaved.push(req.user._id);
          savePromises.push(posting.save());
        }
      });
    }).then(() => {
        Promise.all(savePromises)
          .then(savedPostings => {
            req.session.cart = [];
            res.send(savedPostings);
          });
        });
});

router.post('/', function(req, res, next) {
  Posting.create(req.body.postInfo)
  .then(newPost => res.send(newPost));
});
router.post('/add/newPost', function(req, res, next){
  console.log('adding new post', req.body);

  Posting.find({
    client: req.user._id,
    status: {$in: ['unstarted', 'started', 'pendingApproval']},
    title: req.body.postInfo.title
  })
  .exec()
  .then(function(post){
    if(post.length === 0){
      Posting.create(req.body.postInfo)
      .then(function(newPost){
        console.log('successfully created');
        res.send(newPost);
      })
      .then(null, next);
    }else{
      res.send('Already exists');
    }
  })

  .then(null, next);

});

router.get('/:postingId', function(req, res, next) {
  res.send(req.posting);
});


router.put('/:postingId', (req, res, next) => {
  if(req.body.action === 'reject'){
      var combine = req.posting['artistsWho' + req.body.section];
      var index = combine.indexOf(req.body.reject);
      combine.splice(index,1);
  }
  if(req.user) {
    if(req.body.action === 'update') {
      if(req.body.section === 'Requested') {
        if (_.findIndex(req.posting.artistsWhoRequested, {user: req.user._id}) < 0) {
          req.posting.artistsWhoRequested.push({user: req.user._id});
          console.log('inside add request', req.posting.artistsWhoRequested)
        }
      } else if(req.body.section === 'Saved') {
        if (req.posting.artistsWhoSaved.indexOf(req.user._id) < 0)
          req.posting.artistsWhoSaved.push(req.user);
      }
    } else if(req.body.action === 'assign') {
        req.posting.artist = req.body.accept;
        req.posting.status = "started";
        req.posting.artistsWhoRequested = [];
    } else if(req.body.action === 'save') {
      if (req.posting.artistsWhoSaved.indexOf(req.user._id) < 0)
        req.posting.artistsWhoSaved.push(req.user);
    }
  } else _.assign(req.posting, req.body);

  req.posting.save()
    .then(function(updatedPost){
      res.status(201).send(updatedPost);

    })
    .then(null, next);
});

router.param('postingId',(req, res, next, postingId) => {
  Posting.findById(postingId)
    .populate('client')
    .then(posting => {
      req.posting = posting;
      next();
    })
    .then(null, next);
});
