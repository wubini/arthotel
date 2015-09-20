'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));

router.use('/postings', require('./postings'));
router.use('/users', require('./users'));

router.get('/cart', (req, res, next) => {
  res.send(req.session.cart);
})

router.delete('/cart/:postingId', (req, res, next) => {
  var postingId = req.params.postingId;
  if(req.session.cart.indexOf(postingId.toString())>-1)
  {
    req.session.cart.splice(postingId.toString());
    res.send(req.session.cart);
  }
  else return next();
});


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
