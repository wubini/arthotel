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

            console.log(review);


            // NEED A WAY TO SEND REVIEW
            if($state.current.url==="/artist"){

              PostingFactory.submitReview(scope.job, "pendingApproval", 'artist', review.rating, review.text)
              .then(function(posting)
              {
                $state.go('privatePage.artistTab', {reload:true});
              });
            }

            if($state.current.url==="/client"){
              PostingFactory.submitReview(scope.job, "complete", 'client', review.rating, review.text)
              .then(function(posting)
              {
                $state.go('privatePage.clientTab', {reload: true});
              });
            }

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
