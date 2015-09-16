app.directive("userProfile", function()
{
  return {
    restrict: 'EA',
    scope: {
      user: '='
    },
    controller: function($scope)
    {
      console.log("user logged in",$scope.user);
      $scope.editing = false;
      $scope.toggleEditing = function()
      {
        $scope.editing = !$scope.editing;
      };
    },
    templateUrl: 'js/users/userProfile/user.profile.html'
  };
});
