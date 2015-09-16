app.config(function($stateProvider) {
  $stateProvider.state('privatePage', {
    url: '/me',
    templateUrl: 'js/privatePages/privatePage.html',
    controller: 'privatePageCtrl',
    resolve: {
      allPostings: function(PostingFactory) {
        console.log("getting all postings");
        return PostingFactory.getAllPostings();
      },
      savedPostings: function(AuthService, UserFactory)
      {
        return AuthService.getLoggedInUser()
        .then(function(user)
        {
          return UserFactory.getSavedPostingsForUser(user._id);
        })
      },
      requestedPostings: function(AuthService, UserFactory)
      {
        return AuthService.getLoggedInUser()
        .then(function(user)
        {
          return UserFactory.getRequestedPostingsForUser(user._id);
        })
      },
      activeArtistPostings: function(AuthService, UserFactory)
      {
        return AuthService.getLoggedInUser()
        .then(function(user){
          return UserFactory.getActivePostingsForArtist(user._id);
        })
      },
      activeClientPostings: function(AuthService, UserFactory)
      {
        return AuthService.getLoggedInUser()
        .then(function(user){
          return UserFactory.getActivePostingsForClient(user._id);
        })
      }
    }
  });
});

app.controller('privatePageCtrl', function($scope, AuthService, $state,
  allPostings, savedPostings, requestedPostings, activeArtistPostings, activeClientPostings, Session, PostingFactory) {
  //this will be dynamically changed
  $scope.client = true;
  $scope.activeJobs = [];
  $scope.savedPostings = savedPostings;
  $scope.requestedPostings = requestedPostings;

  console.log(activeArtistPostings);

  if ($scope.client) {
    $scope.activeJobs = activeClientPostings;
  } else {
    $scope.activeJobs = activeArtistPostings;
  }

  $scope.client = false;
  $scope.activeJobs = [];


});
