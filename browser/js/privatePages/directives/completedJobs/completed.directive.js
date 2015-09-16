app.directive('completedJobs', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/directives/completedJobs/completed.html',
    scope: {
      project: '=project',
      artist: '=artist'
    },
    link: function(scope, elem, attr) {
      scope.show = false;
    }
  };
});
