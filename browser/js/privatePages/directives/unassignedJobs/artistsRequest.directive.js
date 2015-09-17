app.directive('artistsRequested', function(PostingFactory) {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/directives/unassignedJobs/artistsRequested.html',
    scope: {
      artist: '=artist',
      project: '='
    },
    link: function(scope){
      scope.acceptArtist = function(artistId, projectId){
        console.log('clicked accept artist!');
        PostingFactory.assignPostingToArtist(artistId, projectId)
          .then(function(){
            console.log('hi!');
          });
      };

      scope.rejectArtist = function(artistId, projectId){
        PostingFactory.rejectArtist(artistId, projectId)
          .then(function(){
            console.log(':(');
          });
      };
    }
  };
});
