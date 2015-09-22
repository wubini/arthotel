app.directive('starRatings', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/starRatings/starratings.html',
        scope:{
          number:"="
        },
        link: function(scope){
          scope.intRating = parseInt(scope.number);
          scope.stars = [1, 2, 3, 4, 5];
          scope.max = 5;

        }
    };
});
