app.config(function ($stateProvider) {
    $stateProvider.state('post', {
        url: '/posts/:postId',
        templateUrl: 'js/post/post.html',
        controller: 'postCtrl'
    });
});

app.controller('postCtrl', function ($scope, AuthService, $state) {
        $scope.project={
            title: 'Awesome Project',
            location: 'New York, NY',
            priceMin: '$1500',
            priceMax: '$3000',
            size: "10'x 11'",
            tags: ['fancy','painting'],
            description: "hello! this is my description :D",
            client:{
                name: 'Bob',
                businessName: 'BobCo.',
                rating: 5
            }
        };

});