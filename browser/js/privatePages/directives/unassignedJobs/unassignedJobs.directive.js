app.directive('unassignedJobs', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/directives/unassignedJobs/unassignedJobs.html',
    scope: {
      project: '=project',
      artists: '=artists'
    },
    link: function(scope, elem, attr) {
      scope.isCollapsed = true;
      scope.artists = _.pluck(scope.project.artistsWhoRequested, "user");
    }
  };
});
