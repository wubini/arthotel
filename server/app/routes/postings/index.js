var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Posting = mongoose.model('Posting');
var User = mongoose.model('User');
var _ = require('lodash');
mongoose.Promise = require('bluebird');
var Path = require('path');
var gmailInfo = require(Path.join(__dirname,'../../../gmailinfo')).gmail;
var nodemailer = require('nodemailer');

var directTransport = require('nodemailer-direct-transport');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailInfo.username,
        pass: gmailInfo.password
    }
});

var mailTo = (recipientEmail, clientName) => {
  var mailOptions = {
    from: gmailInfo.username,
    to: recipientEmail,
    subject: `${clientName} has accepted your request!`,
    text: clientName,
    html: `<h1>${clientName} has agreed to work with you!</h1>
          <p>You are very lucky to be given this rare opportunity to use the right side of your brain.</p>
          <p>Don\'t mess up</p>
          <p>Best of luck.</p>
          `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
    }
  });
};


router.use(function(req, res, next){
  if(req.user){
     req.userIdString = req.user._id.toString();
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
  Posting.find()
    .where({
      _id: {
        $in: req.session.cart
      }
    })
    .then(function(postings) {
      var savePromises = [];
      postings.forEach(posting => {
        if (posting.artistsWhoSaved.indexOf(req.user._id) < 0) {
          posting.artistsWhoSaved.push(req.user._id);
          savePromises.push(posting.save());
        }
      });
      return savePromises;
    }).then((savePromises) => {
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

router.post('/charge', (req, res, next) => {
  res.redirect('/me');
});

router.post('/add/newPost', function(req, res, next){

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
        res.send(newPost);
      })
      .then(null, next);
    }else{
      res.send('Already exists');
    }
  })
  .then(null, next);
});

router.get('/:postingId', (req, res, next) => {
  res.send(req.posting);
});


router.put('/:postingId', (req, res, next) => {
  if(req.body.action === 'reject')
  {
      var combine = req.posting['artistsWho' + req.body.section];
      var index = -1;
      if(req.body.section === 'Requested'){
        combine.forEach(function(requestArtist, i){
          if(requestArtist.user.toString() === req.body.artist.toString()){
            index = i;
          }
        });
      }else if(req.body.section === 'Saved'){
        index = combine.indexOf(req.body.artist);
      }
      combine.splice(index,1);
  }
  else if(req.user)
  {
    if(req.body.action === 'update')
    {
      if(req.body.section === 'Requested')
      {

        if (_.findIndex(req.posting.artistsWhoRequested, {user: req.user._id}) < 0 && req.posting.client._id.toString() !== req.user._id)
        {
          req.posting.artistsWhoRequested.push({user: req.user._id});
        }
      }
      else if(req.body.section === 'Saved')
      {
        if (req.posting.artistsWhoSaved.indexOf(req.user._id) < 0 && req.posting.client._id.toString() !== req.user._id)
          req.posting.artistsWhoSaved.push(req.user);
      }
    }
    else if(req.body.action === 'fullUpdate')
    {
      _.assign(req.posting, req.body.newPost);
    }
    else if(req.body.action === 'assign' && (req.user._id.toString() === req.posting.client._id.toString() || req.user.isAdmin))
    {
        req.posting.paid = true;
        req.posting.artist = req.body.accept;
        req.posting.status = "started";
        User.findById(req.posting.artist)
        .then(user => {
          mailTo(user.email, req.posting.client.displayName);
        });
    }
    else if(req.body.action === 'save')
    {
      if (req.posting.artistsWhoSaved.indexOf(req.user._id) < 0)
      {
        req.posting.artistsWhoSaved.push(req.user);
      }
    }
    else if(req.user._id.toString() === req.posting.client._id.toString()|| req.user._id.toString()=== req.posting.artist.toString()|| req.user.isAdmin)
    {

      _.assign(req.posting, req.body);
    }
  }
  else
  {
    if(!req.session.cart) req.session.cart = [];
    if(req.session.cart.indexOf(req.posting._id.toString())<0)
    {
      req.session.cart.push(req.posting._id);
    }
  }

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
