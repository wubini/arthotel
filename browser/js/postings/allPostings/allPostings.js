app.config(function ($stateProvider) {
    $stateProvider.state('allPostings', {
        url: '/postings',
        templateUrl: 'js/postings/allPostings/allPostings.html',
        controller: 'allPostingsCtrl',
        resolve: {
          currentUser: function(AuthService){
            return AuthService.getLoggedInUser();
          },
          activePosts: function(PostingFactory){
            return PostingFactory.getAllPostings()
            .then(function(postings){
              return postings.filter(function(post){
                return !post.artist;
              })
            });

          }
        }
    });
});

app.controller('allPostingsCtrl', function ($scope, activePosts, AuthService, $state, PostingFactory, currentUser) {

  $scope.postings = activePosts;

  $scope.newPost = function(){
    $state.go('newPosting');
  }
  $scope.loggedIn = false;
  if(currentUser) $scope.loggedIn = true;
});
