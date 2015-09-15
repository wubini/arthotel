app.directive('unassignedJobs', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/unassignedJobs/unassignedJobs.html',
    scope: {
      project: '=project',
    },
    link: function(scope, elem, attr) {
      scope.show = false;
    }
  };
});
