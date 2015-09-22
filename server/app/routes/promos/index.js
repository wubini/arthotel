var router = require('express').Router();
module.exports = router;
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Promo = mongoose.model('Promo');
var _ = require('lodash');

// get all promos
router.get('/', (req, res, next) => {
  Promo.find()
  .populate('user')
  .then(promos => res.send(promos));
});

// get promo by Id

router.get('/:promoId', (req, res, next) => {
  res.send(req.posting);
});
// create new promo
router.post('/', (req, res, next) => {
  Promo.create(req.body.promo)
  .then(newPost => {
    res.send(newPost);
  })
  .then(null, next);
});
// edit existing promo
router.put('/:promoId', (req, res, next) => {
  _.assign(req.promo, req.body.newPromo);
  req.promo.save()
    .then(updatedPromo => {
      res.status(201).send(updatedPromo);
    })
    .then(null, next);
});

router.delete('/:promoId', (req, res, next) => {
  Promo.remove({_id: req.promo._id}).exec()
  .then(response => {
    res.status(200).send();
  })
  .then(null, next);
});

router.param('promoId',(req, res, next, promoId) => {
  Promo.findById(promoId)
    .populate('user')
    .then(promo => {
      req.promo = promo;
      next();
    })
    .then(null, next);
});
