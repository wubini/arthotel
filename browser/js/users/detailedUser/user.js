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

          // clientRating: function(PostingFactory, $stateParams){
          //   return PostingFactory.getDonePostsForUser($stateParams.userId, "client")
          //   .then(function(donePostings){
          //     var num = donePostings.length;
          //     var total = 0;
          //     donePostings.forEach(function(elem){
          //       // total += elem.reviews.client.stars;
          //     });
          //     return total/num;
          //   });
          //  },
          //
          //  clientReviews: function(PostingFactory, $stateParams){
          //   return PostingFactory.getDonePostsForUser($stateParams.userId, "client")
          //   .then(function(donePostings){
          //     return donePostings.map(function(post){
          //       var reviews = {}
          //       if(post.reviews) {
          //         reviews = post.reviews;
          //         reviews.project = post;
          //       }
          //       return reviews;
          //     });
          //   });
          //
          //  }

        }
    });
});

app.controller('userPageCtrl', function ($scope, AuthService, user, clientProjects, artistProjects) {
  $scope.user = user;
  $scope.artistProjects = artistProjects;
  $scope.clientProjects = clientProjects;
});
