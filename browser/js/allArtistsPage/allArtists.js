app.config(function ($stateProvider) {
    $stateProvider.state('allArtists', {
        url: '/users?search',
        templateUrl: 'js/allArtistsPage/allArtists.html',
        controller: 'allArtistsCtrl',
        resolve: {
          currentUser: function(AuthService){
            return AuthService.getLoggedInUser();
          },
          allUsers: function(UserFactory){
            return UserFactory.getAllUsers()
            .then(function(users){
              return users;
            });
          },
        }
    });
});

app.controller('allArtistsCtrl', function ($scope, AuthService, UserFactory, RatingFactory, PostingFactory, TagFactory, $state, $stateParams, currentUser, allUsers) {
  $scope.allUsers = allUsers;

  $scope.allUsers.forEach(user => {
    PostingFactory.getDonePostsForUser(user._id, "artist")
    .then(postings => {
      user.artistRatings = RatingFactory.getRatingFromProjects(postings, "artist");
      console.log("artistRatings", user.artistRatings);
      user.tags = TagFactory.getTagsFromProjects(postings);
    })
  });
});
