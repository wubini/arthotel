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
           reviews: function(PostingFactory, $stateParams){
            return PostingFactory.getDonePostsForUser($stateParams.userId)
            .then(function(donePostings){

              return donePostings.map(function(post){
                var review = {};
                review.project = post.title;
                if(post.client === $stateParams.userId){
                  review.rating = post.reviews[1].stars;
                  review.message = post.reviews[1].text;                  
                  review.role = 'Client'

                }

                if(post.artist === $stateParams.userId){
                  review.rating = post.reviews[0].stars;
                  review.message = post.reviews[0].text;                  
                  review.role = 'Artist'
                }

                return review;
              });

            });
           }
        }
    });
});

app.controller('userPageCtrl', function ($scope, clientRating, AuthService, getUser, reviews) {


  $scope.user = getUser;
  $scope.reviews= reviews;

});