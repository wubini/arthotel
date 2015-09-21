app.directive('artistsRequested', function(PostingFactory, $state) {
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

      scope.acceptArtist = function (artistId, projectId){
        console.log('clicked accept artist!');
        PostingFactory.assignPostingToArtist(artistId, projectId)
          .then(() => {
            console.log('trying to reroute')
            $state.go('privatePage.clientTab', {reload: true});
          });
      };

      scope.rejectArtist = function(artistId, projectId){
        PostingFactory.rejectArtist(artistId, projectId)
          .then(function(){
            $state.go('privatePage.clientTab', {reload: true});
          });
      };
    }
  };
});
