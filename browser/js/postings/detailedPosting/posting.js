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
        $scope.showRequest = true;

        $scope.savePostingToCart = (postingId) => {
          PostingFactory.savePostingToCart(postingId)
          .then(() => {
            $state.go($state.current, $stateParams, {reload: true});
          })
        };

        AuthService.getLoggedInUser()
        .then(function(user)
        {
          $scope.user = user;
          if(user)
          {
            $scope.checkRequestedArray();
          }
        });

        $scope.checkRequestedArray = () => {
          console.log("checking array");
            if(_.findIndex($scope.posting.artistsWhoRequested, {user: $scope.user._id}) < 0) {
              console.log("user has not requested this posting")
              $scope.showRequest = true;
            } else {
              $scope.showRequest = false;
            }
        };

        $scope.requestPosting = (postingId) => {
          PostingFactory.requestPosting(postingId)
          .then(() => {
            $state.go($state.current, $stateParams, {reload: true});
          });
        };

        $scope.deleteRequest = () => {
          PostingFactory.rejectArtist($scope.user._id, $scope.posting._id)
            .then(() => {
              $state.go($state.current,$stateParams, {reload: true});
            });
          };

        $scope.deleteSaved = () => {
          PostingFactory.removeSaveArtist($scope.user._id, $scope.posting._id)
          .then(() => {
              $state.go($state.current,$stateParams, {reload: true});
          });
        };

});
