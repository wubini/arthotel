router.put('/:postingId', function(req, res, next){
  if(req.body.reject){
    // removes an artist from being in the requested array
    var index = req.posting.artistsWhoRequested.indexOf(req.body.reject);
    req.posting.artistsWhoRequested.splice(index,1);
  } else if(req.body.accept){
    if(artistRequested) {
      req.posting.artist = req.body.accept;
      req.posting.status = "started";
      req.posting.artistsWhoRequested = [];
    }else if(artistSave){
      req.posting.artist = req.body.accept;
      req.posting.artistsWhoSaved = [];
    }
  } else{
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
