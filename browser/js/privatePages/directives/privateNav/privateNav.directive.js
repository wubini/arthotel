app.directive('privateNav', function ($state) {
    return {
        restrict: 'E',
        templateUrl: 'js/privatePages/directives/privateNav/privateNav.html',
        link: function(scope, elem, attr){
          console.log("in link fn scope.tab", scope.tab);
          scope.changeRole = function(tab){
            var selected = angular.element(document.getElementById(tab));
            document.querySelector('.active-tab').classList.remove('active-tab');
            selected.addClass('active-tab');
            scope.tab = tab;
          };
          console.log("after scope.changeRole definition");
        }
      }
});
