app.directive('starRatings', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/starRatings/starratings.html',
        link: function(scope){
          var stars = angular.element(document.querySelectorAll('span.star'));
          angular.element(stars[5-scope.review.rating]).addClass('clickedStar');
        }
    };
});
