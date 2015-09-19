app.config(function ($stateProvider) {
    $stateProvider.state('userPage', {
        url: '/user/:userId',
        templateUrl: 'js/users/detailedUser/user.html',
        controller: 'userPageCtrl',
        resolve: {
          getUser: function(UserFactory, $stateParams){
            return UserFactory.getUserById($stateParams.userId);
          },
          clientRating: function(PostingFactory, $stateParams){
            return PostingFactory.getDonePostsForUser($stateParams.userId)
            .then(function(donePostings){
              var num = donePostings.length;
              var total = 0;
              donePostings.forEach(function(elem){
                total += elem.reviews[1].stars;
              });
              return total/num;
            });
           },
           clientReviews: function(PostingFactory, $stateParams){
            return PostingFactory.getDonePostsForUser($stateParams.userId)
            .then(function(donePostings){

              return donePostings.map(function(post){
                var review = {};
                review.rating = post.reviews[1].stars;
                review.message = post.reviews[1].text;

                return review;
              });

            });
           }
        }
    });
});

app.controller('userPageCtrl', function ($scope, clientRating, AuthService, getUser, clientReviews) {


  $scope.user = getUser;

  console.log(clientReviews);

  $scope.clientReviews= clientReviews;

});