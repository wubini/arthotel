var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
var Partnership = mongoose.model('Partnership');

router.get('/', function(req, res, next)
{
  console.log("getting all partnerships for user", req.user)
  Partnership.find()
  .then(function(partnerships)
  {
    res.send(partnerships);
  });
});

router.use('/:postingId', function(req, res, next)
{
  Partnership.findById(req.params.postingId)
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
  console.log("req.session.cart", req.session.cart)
  //add to cart
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
});
