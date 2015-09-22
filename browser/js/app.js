'use strict';
window.app = angular.module('FullstackGeneratedApp', ['ui.router', 'ui.bootstrap', 'fsaPreBuilt', 'ngAnimate', 'isteven-multi-select' ]);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)

    $locationProvider.html5Mode(true);

    if (window.location.hash && window.location.hash === '#_=_') {
        window.location.hash = '';
        window.location.href=window.location.href.slice(0, -1);
    }


    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    //$urlRouterProvider.otherwise('/');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    var destinationAdminOnly = function(state){
        return state.data && state.data.adminOnly;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.

            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                if(destinationAdminOnly(toState)){
                    if(user.isAdmin){
                        $state.go(toState.name, toParams);
                    }else{
                        $state.go('home');
                    }
                }else{
                    $state.go(toState.name, toParams);
                }
            } else {
                $state.go('home');
            }
        });

    });

});
