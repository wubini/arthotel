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
    $scope.searchTerms = $stateParams.search.toLowerCase().split(" ");
    $scope.postings = activePostings.filter(function(posting)
    {
      var contains = true;

      var tagsWordArray = posting.tags;
      var titleWordArray = posting.title.toLowerCase().split(' ');
      var clientNameWordArray = posting.client.displayName.toLowerCase().split(' ');

      $scope.searchTerms.forEach(function(term)
      {
        if(tagsWordArray.indexOf(term)===-1 && titleWordArray.indexOf(term)===-1 && clientNameWordArray.indexOf(term)===-1)
        {
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
