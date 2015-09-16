app.config(function ($stateProvider) {
    $stateProvider.state('newPosting', {
        url: '/postings/add/newPost',
        templateUrl: 'js/postings/newPosting/newposting.html',
        controller: 'newPostingCtrl',
        resolve: {
          currentUser: function(AuthService){
            return AuthService.getLoggedInUser();
          }
        }

    });
});

app.controller('newPostingCtrl', function ($scope, currentUser, AuthService, $state, PostingFactory) {
    $scope.range = [0, 100, 200, 300];

    $scope.newPost = {
      client: currentUser._id
    };


    $scope.sendPost = function(postInfo){
      if(!currentUser) return;
      console.log('hi', postInfo);

      PostingFactory.createNewPosting(postInfo)
      .then(function(newPost){
        console.log('here');
        $state.go('detailedPosting', {postingId:newPost._id});
      });

    };

});
