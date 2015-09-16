app.directive('artistsRequested', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/unassignedJobs/artistsRequested.html',
    scope: {
      artist: '=artist'
    }
  };
});
