app.config(function ($stateProvider) {
    $stateProvider.state('userPage', {
        url: '/user/:userId',
        templateUrl: 'js/users/detailedUser/user.html',
        controller: 'userPageCtrl',
        resolve: {
          getUser: function(){
            //get user by userID.
          }
        }
    });
});

app.controller('userPageCtrl', function ($scope, AuthService, $state) {
  $scope.user = {
    bio: 'hello',
    location: 'New York, NY',
    phone: '917 414 4468'
  };

  $scope.user.reviews=[
    {
      rating: '1',
      message: 'hi'
    },
    {
      rating: 5,
      message: "message!"
    }
  ];

});