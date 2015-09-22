app.directive('writeReview', function ($state, PostingFactory) {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/reviewProject/review.form.html',
        link: function(scope){
          scope.review = {
            text: ''
          };
          scope.hasError = false;
           scope.submitReview = function(review){
            if(!scope.review.rating){
              scope.hasError = true;
              return;
            }

            if($state.current.url==="/artist"){

              PostingFactory.submitReview(scope.job, "pendingApproval", 'artist', review.rating, review.text)
              .then(function(posting)
              {
                $state.reload();
              });
            }

            if($state.current.url==="/client"){
              PostingFactory.submitReview(scope.job, "complete", 'client', review.rating, review.text)
              .then(function(posting)
              {
                $state.reload();
              });
            }

          }
            scope.max = 5;

            scope.hoveringOver = function(value) {
              scope.overStar = value;
              scope.percent = 100 * (value / scope.max);
              console.log(scope.review.rating);
            };


        }
    };
});
