app.config(function ($stateProvider) {
    $stateProvider.state('allPosts', {
        url: '/posts',
        templateUrl: 'js/allPosts/allposts.html',
        controller: 'allPostsCtrl'
    });
});

app.controller('allPostsCtrl', function ($scope, AuthService, $state) {
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