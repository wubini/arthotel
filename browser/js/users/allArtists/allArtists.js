app.config($stateProvider => {
    $stateProvider.state('allArtists', {
        url: '/users?search',
        templateUrl: 'js/users/allArtists/allArtists.html',
        controller: 'allArtistsCtrl',
        resolve: {
          currentUser: function(AuthService){
            return AuthService.getLoggedInUser();
          },
          allUsers: function(UserFactory){
            return UserFactory.getAllUsers()
            .then(users => {
              return users;
            });
          }
        }
    });
});

app.controller('allArtistsCtrl', function ($scope, AuthService, $state, $stateParams, currentUser, allUsers) {
  $scope.allUsers = allUsers;

});
