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
        $scope.posting = posting;
        $scope.savePostingToCart = PostingFactory.savePostingToCart;
        $scope.requestPosting = PostingFactory.requestPosting;
});
