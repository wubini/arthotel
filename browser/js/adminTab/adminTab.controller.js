app.controller('adminCtrl', function($scope, $stateParams, currentUser, $state, allPostings){
  console.log('here?');
  if(!currentUser.isAdmin){
    $state.go('home');
    return;
  }

  $scope.postings = allPostings;

});