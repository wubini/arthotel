app.directive('reviews', function () {
    return {
        scope: {
          user: '=',
          projects: '='
        },
        restrict: 'E',
        templateUrl: 'js/users/detailedUser/review.html'
    };
});
