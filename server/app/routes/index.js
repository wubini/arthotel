'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));

router.use('/postings', require('./postings'));
router.use('/users', require('./users'));

router.use('/cart', (req, res, next) => {
  res.send(req.session.cart);
})


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
