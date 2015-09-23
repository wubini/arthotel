app.directive('artistsRequested', (PostingFactory, $state, PromoFactory) => {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/directives/unassignedJobs/artistsRequested.html',
    scope: {
      artist: '=artist',
      project: '='
    },
    link: scope => {
      scope.acceptArtist = (artistId, projectId) => {
        PostingFactory.assignPostingToArtist(artistId, projectId)
          .then(() => {
            console.log('trying to reroute')
              $state.transitionTo('privatePage.clientTab', $state.params, { reload: true, inherit: true, notify: true }); 
          });
      };

      scope.rejectArtist = (artistId, projectId) => {
        PostingFactory.rejectArtist(artistId, projectId)
          .then(function(){
              $state.transitionTo($state.current, $state.params, { reload: true, inherit: true, notify: true }); 
          });
      };
    }
  };
});
