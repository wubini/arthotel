app.config(function ($stateProvider) {
    $stateProvider.state('allArtists', {
        url: '/users?search',
        templateUrl: 'js/allArtistsPage/allArtists.html',
        controller: 'allArtistsCtrl',
        resolve: {
          currentUser: function(AuthService){
            return AuthService.getLoggedInUser();
          },
          allUsers: function(UserFactory, PostingFactory, RatingFactory, TagFactory){
            return UserFactory.getAllUsers()
            .then(function(users){
              var allPromisedUsers = users.map(user => {
                return PostingFactory.getDonePostsForUser(user._id, "artist")
                .then(postings => {
                  user.artistRatings = RatingFactory.getRatingFromProjects(postings, "artist");
                  user.tags = TagFactory.getTagsFromProjects(postings);
                  return user;
                })
              });

              return Promise.all(allPromisedUsers);
            });
          },
        }
    });
});

app.controller('allArtistsCtrl', function ($scope, AuthService, UserFactory, RatingFactory, PostingFactory, TagFactory, $state, $stateParams, currentUser, allUsers) {
  $scope.allUsers = allUsers;

});
