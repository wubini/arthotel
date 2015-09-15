app.config(function ($stateProvider) {
    $stateProvider.state('newPost', {
        url: '/post/newPost',
        templateUrl: 'js/newPost/newpost.html',
        controller: 'newPostCtrl'
        
    });
});

app.controller('newPostCtrl', function ($scope, AuthService, $state) {
    $scope.range = [0, 100, 200, 300];
});