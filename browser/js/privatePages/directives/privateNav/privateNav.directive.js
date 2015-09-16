app.directive('privateNav', function ($state) {
    return {
        restrict: 'E',
        templateUrl: 'js/privatePages/directives/privateNav/privateNav.html',
        link: function(scope, elem, attr){
          scope.changeRole = function(role){
            var selected = angular.element(document.getElementById(role));
            console.log("before removal",document.querySelector('.active-tab'));
            document.querySelector('.active-tab').classList.remove('active-tab');
            console.log("after removal",document.querySelector('.active-tab'));
            selected.addClass('active-tab');

            if(role ==='artist'){
              scope.tab='artist';
            }else if(role==='client'){
              scope.tab ='client';
            }else if(role==='profile'){
              scope.tab = 'profile';
            }
          };
        }
      }
});
