app.config(function ($stateProvider) {
    $stateProvider.state('posting', {
        url: '/postings/:postingId',
        templateUrl: 'js/posts/detailedPost/post.html',
        controller: 'postCtrl',
        resolve: {
          post: function(PostFactory, $stateParams)
          {
            return PostFactory.getPostById($stateParams.postingId);
          }
        }
    });
});

app.controller('postCtrl', function ($scope, AuthService, $state, $stateParams, post) {
        // $scope.project={
        //     title: 'Awesome Project',
        //     location: 'New York, NY',
        //     priceMin: '$1500',
        //     priceMax: '$3000',
        //     size: "10'x 11'",
        //     tags: ['fancy','painting'],
        //     description: "hello! this is my description :D",
        //     client:{
        //         name: 'Bob',
        //         businessName: 'BobCo.',
        //         rating: 5
        //     }
        // };
        $scope.post = post;
});
