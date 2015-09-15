app.directive('privateNav', function ($state) {
    return {
        restrict: 'E',
        templateUrl: 'js/privatePages/directives/privateNav/privateNav.html',
        link: function(scope, elem, attr){
          scope.changeRole = function(role){
            var selected = angular.element(document.getElementById(role));
            document.querySelector('.active').classList.remove('active');
            selected.addClass('active');

            if(role == 'artist'){
              scope.client = false;
            }else{
              scope.client = true;
            }

          };

          
        }
      }
});