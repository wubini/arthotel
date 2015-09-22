app.config(function ($stateProvider) {
    $stateProvider
    .state('privatePage.adminTab', {
        url: '/admin',
        templateUrl: 'js/adminTab/adminTab.html',
        controller: 'adminCtrl',
        data: {
          adminOnly: true
        },
        resolve: {
          currentUser: function(AuthService){
            return AuthService.getLoggedInUser();
          },
          allPostings: function(PostingFactory){
            return PostingFactory.getAllPostings();
          },
          allUsers: function(UserFactory){
            return UserFactory.getAllUsers()
            .then(function(users){
              return users;
            });
          }
        }
    });
});
