var router = require('express').Router();
module.exports = router;
var User = require('../../../db/models').User;

router.use('/', function(req, res, next)
{
  console.log("requesting all users");
  User.find()
  .then(function(users)
  {
    res.send(users);
  });
});
