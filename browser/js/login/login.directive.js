app.directive('login', function ($state, PostingFactory, AuthService) {
    return {
        restrict: 'E',
        templateUrl: 'js/login/login-dropdown.html',
        link: function(scope){
          scope.login = {};
          scope.error = null;

            $('.dropdown-menu form').click(function(e) {
              e.stopPropagation();
            });

          scope.sendLogin = function (loginInfo) {

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