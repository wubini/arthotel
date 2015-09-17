app.config(function ($stateProvider) {
    $stateProvider.state('allPostings', {
        url: '/postings',
        templateUrl: 'js/postings/allPostings/allPostings.html',
        controller: 'allPostingsCtrl',
        resolve: {
          currentUser: function(AuthService){
            return AuthService.getLoggedInUser();
          }
        }
    });
});

app.controller('allPostingsCtrl', function ($scope, AuthService, $state, PostingFactory, currentUser) {
  PostingFactory.getAllPostings()
  .then(function(postings)
  {
    $scope.postings = postings;
  });

  $scope.newPost = function(){
    $state.go('newPosting');
  }
  $scope.loggedIn = false;
  if(currentUser) $scope.loggedIn = true;
});
