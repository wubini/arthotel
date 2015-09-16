app.config(function($stateProvider) {
  $stateProvider.state('privatePage', {
    url: '/me',
    templateUrl: 'js/privatePages/privatePage.html',
    controller: 'privatePageCtrl',
    resolve: {
      user: function(AuthService)
      {
        return AuthService.getLoggedInUser()
        .then(function(user)
        {
          return user;
        });
      },
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
        });
      },
      requestedPostings: function(AuthService, UserFactory)
      {
        return AuthService.getLoggedInUser()
        .then(function(user)
        {
          return UserFactory.getRequestedPostingsForUser(user._id);
        });
      },
      activeArtistPostings: function(AuthService, UserFactory)
      {
        return AuthService.getLoggedInUser()
        .then(function(user){
          return UserFactory.getActivePostingsForArtist(user._id);
        });
      },
      activeClientPostings: function(AuthService, UserFactory)
      {
        return AuthService.getLoggedInUser()
        .then(function(user){
          return UserFactory.getActivePostingsForClient(user._id);
        });
      }
    }
  });
});

app.controller('privatePageCtrl', function($scope, AuthService, $state, user,
  allPostings, savedPostings, requestedPostings, activeArtistPostings, activeClientPostings, Session, PostingFactory) {
  //this will be dynamically changed
  $scope.client = true;
  $scope.activeJobs = [];
  $scope.savedPostings = savedPostings;
  $scope.requestedPostings = requestedPostings;
  $scope.user = user;

  //console.log(activeArtistPostings);

  if ($scope.client) {
    $scope.activeJobs = activeClientPostings;
  } else {
    $scope.activeJobs = activeArtistPostings;
  }
  //replace with user._id;
  // var tempUserId = '55f9cd8aacbf8b0749637dcb';
  PostingFactory.getPostsForUser(user._id)
    .then(function(projects) {
      $scope.projects = projects;
      $scope.doneProjects = $scope.projects;
    })
    .then(null, console.error);

  PostingFactory.getDonePostsForUser(user._id)
    .then(doneProjects => $scope.doneProjects = doneProjects)
    .then(null, console.error);

  $scope.client = false;
  $scope.activeJobs = [];


});
