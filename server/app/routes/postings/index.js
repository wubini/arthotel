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

router.post('/:postingId', function(req, res, next)
{
  //add to cart and/or add partnership
  var action = req.body.action;
  if(req.user)
  {
    console.log("user logged in", req.user);
    if(action==="save")
    {
      req.posting.artistsWhoSaved.push(req.user);
    }
    else if(action==="request")
    {
      req.posting.artistsWhoRequested.push(req.user);
    }
  }
  else
  {
    console.log("req.session.cart", req.session.cart)
    if(req.session.cart)
    {
      console.log("index",req.session.cart.indexOf(req.posting._id), "req.posting._id", req.posting._id);
      if(req.session.cart.indexOf(req.posting._id.toString())<0)
      {
        req.session.cart.push(req.posting._id.toString());
      }
    }
    else
    {
      req.session.cart = [req.posting._id.toString()];
    }
    res.send(req.posting);
  }
});
