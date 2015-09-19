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
    $scope.writing = true;

    if(!currentUser) $state.go('home');

    $scope.newPost = {
      client: currentUser._id,
      photos: []
    };

    $scope.titleIssue = false;

    $scope.sendPost = function(postInfo){
      if(!currentUser) return;

      $scope.titleIssue = false;

      PostingFactory.createNewPosting(postInfo)
      .then(function(newPost){
        if(newPost._id){
          $state.go('detailedPosting', {postingId:newPost._id});
        }else{
          $scope.titleIssue = true;
        }
      });

    };

    $scope.cancel = function(){
      $state.go('home');
    };

    $scope.preview = function(postInfo){
      $scope.writing = !$scope.writing;
      $scope.posting = $scope.newPost;
    };

});
