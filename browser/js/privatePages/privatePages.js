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

  console.log("me state controller start");
  $scope.tab = 'artist';
  $scope.savedPostings = savedPostings;
  $scope.requestedPostings = requestedPostings;
  $scope.activeClientJobs = activeClientPostings;
  $scope.activeArtistJobs = activeArtistPostings;
  $scope.user = user;
  console.log("in private page ctrl, user", $scope.user);

  PostingFactory.getPostsForUser($scope.user._id)
    .then(function(projects) {
      $scope.projects = projects;
    })
    .then(null, console.error);

  PostingFactory.getDonePostsForUser($scope.user._id)
    .then(doneProjects => $scope.doneProjects = doneProjects)
    .then(null, console.error);

  console.log("me start controller finish");
});
