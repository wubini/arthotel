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

app.controller('allArtistsCtrl', function ($scope, AuthService, UserFactory, PostingFactory, $state, $stateParams, currentUser, allUsers) {
  $scope.allUsers = allUsers;

  $scope.allUsers.forEach(user => {
    //TODO-- Change this request to get the completed projects for which the user was the artist
    user.artistRatingTotal = 0;
    user.artistRating = 0;
    user.numDoneProjects = 0;
    PostingFactory.getDonePostsForUser(user._id, "artist")
    .then(postings => {
      console.log(`in all artists page ctrl, got done postings for user ${user.id}`, postings);
      postings.forEach(posting => {
        user.numDoneProjects ++;
        user.tags = _.union(user.tags, posting.tags);
        if(posting.reviews && posting.reviews.client && posting.reviews.client.stars) {
          user.artistRatingTotal += posting.reviews.client.stars;
        }
      });
      return user;
    })
    .then(user => {
      if(user.numDoneProjects)
      {
        user.artistRating = user.artistRatingTotal/user.numDoneProjects;
      }
    });
  });
});
