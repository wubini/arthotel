app.directive('artistsRequested', (PostingFactory, $state) => {
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
            $state.reload();
          });
      };

      scope.rejectArtist = (artistId, projectId) => {
        PostingFactory.rejectArtist(artistId, projectId)
          .then(function(){
            $state.reload();
          });
      };
    }
  };
});
