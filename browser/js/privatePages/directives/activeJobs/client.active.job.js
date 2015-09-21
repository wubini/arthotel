app.directive('clientActiveJob', function ($state, PostingFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/privatePages/directives/activeJobs/client.active.job.html',
        link: function(scope){
          // elem.on('click', function(){
          //   $state.go('detailedPosting', {postingId: scope.job._id});
          // });

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
