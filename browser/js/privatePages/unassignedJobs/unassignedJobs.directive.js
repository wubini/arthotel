app.directive('unassignedJobs', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/unassignedJobs/unassignedJobs.html',
    scope: {
      project: '=project',
      artists: '=artists'
    },
    link: function(scope, elem, attr) {
      scope.show = false;
    }
  };
});
