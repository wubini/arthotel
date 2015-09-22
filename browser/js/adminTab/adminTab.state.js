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
          }
        }

    });
});
