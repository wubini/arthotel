app.config(function ($stateProvider) {
    $stateProvider.state('userPage', {
        url: '/user/:userId',
        templateUrl: 'js/users/detailedUser/user.html',
        controller: 'userPageCtrl',
        resolve: {
          user: (UserFactory, $stateParams) => {
            return UserFactory.getUserById($stateParams.userId);
          },

          clientProjects: (PostingFactory, $stateParams) => {
            return PostingFactory.getDonePostsForUser($stateParams.userId, "client")
            .then(postings => {
              postings.forEach(posting => {
                posting.userRole = "Client";
              });
              return postings;
            })
          },

          artistProjects: (PostingFactory, $stateParams) => {
            return PostingFactory.getDonePostsForUser($stateParams.userId, "artist")
            .then(postings => {
                postings.forEach(posting => {
                posting.userRole = "Artist";
              });
              return postings;
            })
          },

        }
    });
});

app.controller('userPageCtrl', function ($scope, AuthService, user, clientProjects, artistProjects, RatingFactory) {
  $scope.user = user;
  $scope.artistProjects = artistProjects;
  $scope.clientProjects = clientProjects;
  console.log('artist: ', $scope.artistProjects);
  console.log('client: ', $scope.clientProjects);
  $scope.allProjects = _.union(artistProjects, clientProjects);
  $scope.artistStars = RatingFactory.getRatingFromProjects($scope.artistProjects, "artist");
  $scope.clientStars = RatingFactory.getRatingFromProjects($scope.clientProjects, "client");
});
