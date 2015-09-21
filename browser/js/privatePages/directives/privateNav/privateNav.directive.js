app.directive('privateNav', function ($state, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: 'js/privatePages/directives/privateNav/privateNav.html',
        link: function(scope){
          scope.changeRole($stateParams.tab);
        }
      }
});
