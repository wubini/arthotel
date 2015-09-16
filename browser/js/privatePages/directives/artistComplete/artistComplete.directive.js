app.directive('artistComplete', function() {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/directives/completedJobs/completed.html',
    scope: {
      done: '=done'
    }
  };
});
