var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');

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
