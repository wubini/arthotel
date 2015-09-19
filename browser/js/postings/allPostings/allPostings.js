app.config(function ($stateProvider) {
    $stateProvider.state('allPostings', {
        url: '/postings?search',
        templateUrl: 'js/postings/allPostings/allPostings.html',
        controller: 'allPostingsCtrl',
        resolve: {
          currentUser: function(AuthService){
            return AuthService.getLoggedInUser();
          },
          activePostings: function(PostingFactory){
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

app.controller('allPostingsCtrl', function ($scope, activePostings, AuthService, $state, $stateParams, PostingFactory, currentUser) {

  $scope.searchTerms = {};
  $scope.postings = activePostings;

  if($stateParams.search)
  {
    $scope.searchTerms = $stateParams.search.split(" ");
    $scope.postings = activePostings.filter(function(posting)
    {
      var contains = true;
      $scope.searchTerms.forEach(function(term)
      {
        console.log(`checking ${posting.title} for term ${term}`);
        if(posting.tags.indexOf(term)===-1)
        {
          console.log("not found in tags", posting.tags);
          contains = false;
        }
      })

      return contains;
    })
  }

  $scope.newPost = function(){
    $state.go('newPosting');
  }
  $scope.loggedIn = false;
  if(currentUser) $scope.loggedIn = true;
});
