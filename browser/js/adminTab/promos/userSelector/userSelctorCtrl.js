app.controller('userSelectorCtrl', ($scope, UserFactory) => {

  UserFactory.getAllUsers()
    .then(users => $scope.users = users);

});
