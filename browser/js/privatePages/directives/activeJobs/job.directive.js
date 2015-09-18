app.directive('job', function ($state, PostingFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/privatePages/directives/activeJobs/job.html',
        link: function(scope, elem, attr){
          // elem.on('click', function(){
          //   $state.go('detailedPosting', {postingId: scope.job._id});
          // });

          scope.artistCompleted = function(){
            PostingFactory.changePostingStatus(scope.job._id, "pendingApproval")
            .then(function(posting)
            {
              $state.go('privatePage',{tab: scope.tab}, {reload:true});
            });
          }

          scope.clientApproved = function(){
            PostingFactory.changePostingStatus(scope.job._id, "complete")
            .then(function(posting)
            {
              $state.go('privatePage',{tab: scope.tab}, {reload: true});
            });
          }
        }
    };
});
