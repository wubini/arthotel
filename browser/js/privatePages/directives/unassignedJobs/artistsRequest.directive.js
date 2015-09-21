app.directive('artistsRequested', (PostingFactory, $state) => {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/directives/unassignedJobs/artistsRequested.html',
    scope: {
      artist: '=artist',
      project: '='
    },
    link: function(scope){
      //
      // scope.confirmForm = (artistId, projectId) => {
      //
      // };

      scope.acceptArtist = (artistId, projectId) => {
        PostingFactory.assignPostingToArtist(artistId, projectId)
          .then(() => {
            console.log('trying to reroute');
            $state.go('privatePage.clientTab', {reload: true});
          });
      };

      scope.rejectArtist = (artistId, projectId) => {
        PostingFactory.rejectArtist(artistId, projectId)
          .then(() => {
            $state.go('privatePage.clientTab', {reload: true});
          });
      };
    }
  };
});
