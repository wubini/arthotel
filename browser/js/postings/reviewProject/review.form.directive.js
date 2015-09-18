app.directive('writeReview', function ($state, PostingFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/reviewProject/review.form.html',
        link: function(scope, elem, attr){
          scope.review = {};
          scope.hasError = false;
           scope.submitReview = function(review){
            if(!scope.review.rating){
              return scope.hasError = true;
            }

            console.log(review);

            // NEED A WAY TO SEND REVIEW
            // if(scope.tab === 'artist'){

            //   PostingFactory.changePostingStatus(scope.job._id, "pendingApproval")
            //   .then(function(posting)
            //   {
            //     $state.go('privatePage',{tab: scope.tab}, {reload:true});
            //   });              
            // }

            // if(scope.tab === 'client'){
            //   PostingFactory.changePostingStatus(scope.job._id, "complete")
            //   .then(function(posting)
            //   {
            //     $state.go('privatePage',{tab: scope.tab}, {reload: true});
            //   });
            // }

          }

          var stars = angular.element(document.querySelectorAll('span.star'));
          stars.on('click', function(){
            var currentStar = angular.element(this);
            var clicked = document.querySelector('span.clickedStar');
            if(clicked){
              angular.element(document.querySelector('span.clickedStar')).removeClass('clickedStar');
            }
            currentStar.addClass('clickedStar');
            scope.review.rating = this.id;

          });
        }
    };
});
