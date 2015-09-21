app.directive('completeArtist', function() {
  return {
    restrict: 'E',
    templateUrl: `js/privatePages/directives/completedJobs/completed.artist.html`,
    scope: {
      artist: '=artist'
    }
  };
});
