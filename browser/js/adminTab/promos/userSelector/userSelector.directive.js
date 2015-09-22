app.directive('userSelctor', ()=> {
  return {
    restrict: 'E',
    templateUrl: 'js/adminTab/promos/userSelector/userSelector.html',
    replace: true,
    scope: {
      ngModel: '=ngModel'
    },
    controller: 'userSelectorCtrl'
  };
});
