app.config(function ($stateProvider) {
    $stateProvider.state('privatePage', {
        url: '/me',
        templateUrl: 'js/privatePages/privatePage.html',
        controller: 'privatePageCtrl'
    });
});

app.controller('privatePageCtrl', function ($scope, AuthService, $state) {

});