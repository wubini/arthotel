app.config(function ($stateProvider) {
    $stateProvider
    .state('privatePage.adminTab', {
        url: '/admin',
        templateUrl: 'js/adminTab/adminTab.html',
        controller: 'adminCtrl',
        resolve: {
          currentUser: function(AuthService){
            return AuthService.getLoggedInUser();
          },
          allPostings: function(PostingFactory){
            return PostingFactory.getAllPostings();
          }
        }
    });
});
