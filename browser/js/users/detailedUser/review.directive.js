app.directive('review', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/users/detailedUser/review.html',
        scope: {
          reviews: '='
        }
    };
});