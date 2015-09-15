app.directive('job', function ($state) {
    return {
        restrict: 'E',
        templateUrl: 'js/privatePages/directives/activeJobs/job.html',
        link: function(scope, elem, attr){
          elem.on('click', function(){
            $state.go('detailedPosting', {postingId: scope.job._id});
          });
        }
    };
});