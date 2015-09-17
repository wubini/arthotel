app.directive("userProfile", function()
{
  return {
    restrict: 'EA',
    scope: {
      user: '='
    },
    controller: function($scope)
    {
      $scope.userCopy = {};
      for(var key in $scope.user)
      {
        $scope.userCopy[key]= $scope.user[key];
      }
      console.log("user logged in",$scope.user);
      $scope.editing = false;
      $scope.toggleEditing = function()
      {
        $scope.editing = !$scope.editing;
      }

      $scope.restoreValuesToSaved = function()
      {
        for(var key in $scope.user)
        {
          $scope.user[key]= $scope.userCopy[key];
        }
      }
    },
    templateUrl: 'js/users/userProfile/user.profile.html'
  }
})
