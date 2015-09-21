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
    user.artistRatingTotal = 8;
    user.artistRating = 0;
    user.numDoneProjects = 2;
    UserFactory.unassignedPostings(user._id)
    .then(postings => {
      postings.forEach(posting => {
        user.numDoneProjects ++;
        user.tags = _.union(user.tags, posting.tags);
        if(posting.artistRating) {
          user.artistRatingTotal += reviews[_.findIndex(posting.reviews, rev => {
          return rev.type==="client";
          })];
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
