

router.put('/:postingId', (req, res, next) => {
  if(req.body.action === 'reject'){
      var combine = req.posting['artistsWho' + req.body.section];
      var index = combine.indexOf(req.body.reject);
      combine.splice(index,1);
  }
  if(req.user) {
    if(req.body.action === 'update') {
      if(req.body.section === 'Requested') {
        if (req.posting.artistsWhoRequested.indexOf(req.user._id) < 0)
          req.posting.artistsWhoRequested.push(req.user);
      } else if(req.body.section === 'Saved') {
        if (req.posting.artistsWhoSaved.indexOf(req.user._id) < 0)
          req.posting.artistsWhoSaved.push(req.user);
      }
    } else if(req.body.action === 'assign') {
        req.posting.artist = req.body.accept;
        req.posting.status = "started";
        req.posting.artistsWhoRequested = [];
    } else if(req.body.action === 'save') {
      if (req.posting.artistsWhoSaved.indexOf(req.user._id) < 0)
        req.posting.artistsWhoSaved.push(req.user);
    }
  } else _.assign(req.posting, req.body);

  req.posting.save()
    .then(function(updatedPost){
      res.status(201).send(updatedPost);

    })
    .then(null, next);
});