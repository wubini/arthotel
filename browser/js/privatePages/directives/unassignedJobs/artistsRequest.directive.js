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

      scope.acceptArtist = (artistId, projectId) => {
        console.log('clicked accept artist!');
        PostingFactory.assignPostingToArtist(artistId, projectId)
          .then(() => {
            $state.go('privatePage', {tab: 'client'}, {reload: true});
          });
      };

      scope.rejectArtist = function(artistId, projectId){
        PostingFactory.rejectArtist(artistId, projectId)
          .then(function(){
            $state.go('privatePage', {tab: 'client'}, {reload: true});
          });
      };
    }
  };
});
