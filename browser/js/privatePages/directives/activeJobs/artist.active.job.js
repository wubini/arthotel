app.directive('artistActiveJob', function ($state, PostingFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/privatePages/directives/activeJobs/artist.active.job.html',
        scope:{
          job: "="
        },
        link: function(scope){
          // elem.on('click', function(){
          //   $state.go('detailedPosting', {postingId: scope.job._id});
          // });

          scope.artistCompleted = function(){
            console.log(scope.job);
            PostingFactory.submitReview(scope.job)
            .then(function(posting)
            {
              $state.transitionTo($state.current, $state.params, { reload: true, inherit: true, notify: true }); 
            });
          }
        }
    };
});
