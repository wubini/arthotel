app.controller('adminCtrl', function($scope, $stateParams, currentUser, $state, allPostings, allUsers){
  if(!currentUser.isAdmin){
    $state.go('home');
    return;
  }
  $scope.statuses = [
    {
      status: '',
      show: 'All'
    },
    {
      status: 'unstarted',
      show: 'Unassigned'
    },
    {
      status: 'started',
      show: 'Started'
    },
    {
      status: 'pendingApproval',
      show: 'Pending Client Approval'
    },
    {
      status: 'complete',
      show: 'Complete'
    }
  ];

  $scope.postings = allPostings;
  $scope.currentUser = currentUser;
  $scope.filter = '',
  $scope.strict = false;
  $scope.allUsersAdmin = allUsers;
  console.log('in controller: ', $scope.allUsers);

  $scope.filterStatus = () => {
      if($scope.filter !== ''){
        $scope.strict = true;
      }else{
        $scope.strict = false;
      }
  }

});
