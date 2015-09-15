app.config(function ($stateProvider) {
    $stateProvider.state('newPosting', {
        url: '/postings/newPost',
        templateUrl: 'js/newPosting/newposting.html',
        controller: 'newPostingCtrl'

    });
});

app.controller('newPostingCtrl', function ($scope, AuthService, $state) {
    $scope.range = [0, 100, 200, 300];
});
