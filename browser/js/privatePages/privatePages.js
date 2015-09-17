app.config(function($stateProvider) {
  $stateProvider.state('privatePage', {
    url: '/me/:tab',
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
      },
      unassignedPostings: function(AuthService, UserFactory){
        return AuthService.getLoggedInUser()
        .then(function(user){
          return UserFactory.unassignedPostings(user._id);
        })
      }
    }
  });
});

app.controller('privatePageCtrl', function($scope, $stateParams, AuthService, $state, user,
  allPostings, savedPostings, requestedPostings, unassignedPostings, activeArtistPostings, activeClientPostings, Session, PostingFactory) {
  //this will be dynamically changed
  $scope.tab = $stateParams.tab;
  $scope.savedPostings = savedPostings;
  $scope.requestedPostings = requestedPostings;
  $scope.activeClientJobs = activeClientPostings;
  $scope.activeArtistJobs = activeArtistPostings;
  $scope.user = user;
  $scope.unassignedPostings = unassignedPostings;

  //we need this to make sure that console.error works
  console.error = console.error.bind(console);

  console.log("in private page ctrl, user", $scope.user);


  PostingFactory.getDonePostsForUser($scope.user._id)
    .then(doneProjects => $scope.doneProjects = doneProjects)
    .then(null, console.error);

  //$scope.amountOwed = $$$;
  var size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  $scope.requestedPostingsCount = size(requestedPostings);
  $scope.activeArtistJobsCount = size(activeArtistPostings);
  $scope.savedPostingsCount = size(savedPostings);

});
