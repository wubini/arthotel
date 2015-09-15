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
      }
    }
  });
});

app.controller('privatePageCtrl', function($scope, AuthService, $state,
  allPostings, savedPostings, requestedPostings, Session, PostingFactory) {
  //this will be dynamically changed
  $scope.client = true;
  $scope.activeJobs = [];
  $scope.savedPostings = savedPostings;
  $scope.requestedPostings = requestedPostings;

  if ($scope.client) {
    allPostings.forEach(function(post) {
      if (post.client == Session.id && status == 'started') {
        $scope.activeJobs.push(post);
      }
    });
  } else {
    allPostings.forEach(function(post) {
      if (post.artist == Session.id && status == 'started') {
        $scope.activeJobs.push(post);
      }
    });
  }

  $scope.client = false;
  $scope.activeJobs = [];


});
