app.directive('starRatings', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/starRatings/starratings.html',
        scope:{
          rating:"="
        },
        link: function(scope){

          scope.stars = [1, 2, 3, 4, 5];
        }
    };
});
