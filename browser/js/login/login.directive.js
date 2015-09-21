app.directive('login', function ($state, PostingFactory, AuthService) {
    return {
        restrict: 'E',
        templateUrl: 'js/login/login-dropdown.html',
        link: function(scope){
          scope.login = {};
          scope.error = null;

        //  $('.dropdown-menu form').click(e => e.stopPropagation());

      scope.isopen = false;

      scope.toggled = function(open) {
          console.log('Dropdown is now: ', open);
        };
        console.log(scope.isopen);
      scope.toggleDropdown = function($event) {
        console.log(scope.isopen);
          if(scope.isopen){
            console.log('here');
            $event.preventDefault();
            $event.stopPropagation();
          }
        };
          scope.sendLogin = loginInfo => {

              scope.error = null;

              AuthService.login(loginInfo).then(function () {
                  $state.go('home');
              }).catch(function () {
                  scope.error = 'Invalid login credentials.';
              });

          };

        }

	}
});
