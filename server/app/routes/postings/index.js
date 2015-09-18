var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Posting = mongoose.model('Posting');
mongoose.Promise = require('bluebird');

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

router.post('/', function(req, res, next){
  Posting.create(req.body.postInfo)
  .then(newPost => res.send(newPost))
  .then(null, next);
});

router.get('/:postingId', function(req, res, next) {
  res.send(req.posting);
});

router.put('/:postingId', function(req, res, next){
  console.log("req.body in put posting", req.body);
  if(req.body.reject){
    console.log("Rejected! ", req.body);
    var index = req.posting.artistsWhoRequested.indexOf(req.body.reject);
    req.posting.artistsWhoRequested.splice(index,1);

  }else if(req.body.accept){
    req.posting.artist = req.body.accept;
    req.posting.status = "started";
    req.posting.artistsWhoRequested = [];
  }else{
    for(var k in req.body){
      req.posting[k] = req.body[k];
    }
  }
  console.log("status ",req.posting.status);
  req.posting.save()
    .then(function(updatedPost){
      res.status(201).send(updatedPost);

    })
    .then(null, next);
});

router.put('/:postingId/save', (req, res, next) => {
  if(req.body.reject){
    console.log("Rejected! ", req.body);
    var index = req.posting.artistsWhoSaved.indexOf(req.body.reject);
    req.posting.artistsWhoSaved.splice(index,1);
  }else if(req.body.accept){
    req.posting.artist = req.body.accept;
    req.posting.artistsWhoSaved = [];
  }else {
      for(var k in req.body){
        req.posting[k] = req.body[k];
      }
  }
  req.posting.save()
    .then(function(updatedPost){
      res.status(201).send(updatedPost);

    })
    .then(null, next);
});

router.post('/:postingId', function(req, res, next) {
  var action = req.body.action;
  if (req.user) {
    console.log("user logged in", req.user);
    if (action === "save") {
      if (req.posting.artistsWhoSaved.indexOf(req.user._id) < 0) {
        req.posting.artistsWhoSaved.push(req.user);
      }
    } else if (action === "request") {
      if (req.posting.artistsWhoRequested.indexOf(req.user._id) < 0) {
        req.posting.artistsWhoRequested.push(req.user);
      }
    }
  } else {
    console.log("req.session.cart", req.session.cart);
    if (req.session.cart) {
      console.log("index", req.session.cart.indexOf(req.posting._id),
        "req.posting._id", req.posting._id);
      if (req.session.cart.indexOf(req.posting._id.toString()) < 0) {
        req.session.cart.push(req.posting._id.toString());
      }
    } else {
      req.session.cart = [req.posting._id.toString()];
    }
  }
  req.posting.save()
    .then(posting => res.send(posting));
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
