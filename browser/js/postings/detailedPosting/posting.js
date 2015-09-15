app.config(function ($stateProvider) {
    $stateProvider.state('detailedPosting', {
        url: '/postings/:postingId',
        templateUrl: 'js/postings/detailedPosting/posting.html',
        controller: 'postingCtrl',
        resolve: {
          posting: function(PostingFactory, $stateParams)
          {
            return PostingFactory.getPostingById($stateParams.postingId);
          }
        }
    });
});

app.controller('postingCtrl', function ($scope, AuthService, $state, $stateParams, posting, PostingFactory) {
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
        $scope.posting = posting;
        $scope.savePostingToCart = PostingFactory.savePostingToCart;
        $scope.requestPosting = PostingFactory.requestPosting;
});
