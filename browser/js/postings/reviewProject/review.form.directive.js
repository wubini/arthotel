app.directive('writeReview', function ($state, PostingFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/reviewProject/review.form.html',
        link: function(scope, elem, attr){
           scope.artistCompleted = function(review){
            console.log(review);
            // PostingFactory.changePostingStatus(scope.job._id, "pendingApproval")
            // .then(function(posting)
            // {
            //   $state.go('privatePage',{tab: scope.tab}, {reload:true});
            // });
          }

          console.log(document.querySelectorAll('span.star'));

          var stars = angular.element(document.querySelectorAll('span.star'));
          stars.on('click', function(){
            console.log('here', this);
            angular.element(document.querySelector('span.clickedStar')).removeClass('clickedStar');
            angular.element(this).addClass('clickedStar');
          });
        }
    };
});
