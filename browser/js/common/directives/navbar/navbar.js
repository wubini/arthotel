app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            // $('li').invertImgText();
            // document.querySelector('.navbar > .container').invertImgText();
            scope.items = [
                { label: 'Projects', state: 'allPostings({search: undefined})', loggedOut: false },
                { label: 'Find an Artist', state: 'allArtists', loggedOut: false},
                { label: 'Me', state: 'privatePage.artistTab', auth: true , loggedOut: false},
                { label: 'Me', state: 'loggedOutCart', auth:false, loggedOut: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = () => AuthService.logout().then(() => $state.go('home'));

            var setUser = function () {
                AuthService.getLoggedInUser().then(user => scope.user = user);
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

            scope.facebookLogin = function(){
                AuthService.facebookLogin();
            };
            scope.googleLogin = function() {
              AuthService.googleLogin();
            }
        }

    };

});
