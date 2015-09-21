app.directive('privateNav', function ($state, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: 'js/privatePages/directives/privateNav/privateNav.html',
        link: function(scope){
          console.log("in link fn scope.tab", scope.tab);
          scope.changeRole = function(tab){
            var selected = angular.element(document.getElementById(tab));
            if(document.querySelector('.active-tab')){
              document.querySelector('.active-tab').classList.remove('active-tab');
            }
            selected.addClass('active-tab');
            scope.tab = tab;
            $state.go('privatePage', {tab: tab});
          };

          scope.changeRole($stateParams.tab);
        }
      }
});
