app.directive('completedJobs', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/directives/completedJobs/completed.html',
    scope: {
      done: '=done'
    },
    link: function(scope, elem, attr) {
      scope.show = false;
    }
  };
});
