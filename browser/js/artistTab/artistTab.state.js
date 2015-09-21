app.config(function ($stateProvider) {
    $stateProvider
    .state('privatePage.artistTab', {
        url: '/artist',
        templateUrl: 'js/artistTab/artistTab.html'
    });
});
