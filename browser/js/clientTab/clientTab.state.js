app.config(function ($stateProvider) {
    $stateProvider
    .state('privatePage.clientTab', {
        url: '/client',
        templateUrl: 'js/clientTab/clientTab.html'
    });
});
