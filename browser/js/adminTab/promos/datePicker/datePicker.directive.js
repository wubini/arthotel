app.directive('datePicker', () => {
  return {
    restrict: 'E',
    templateUrl: 'js/adminTab/promos/datePicker/datePicker.html',
    replace: true,
    scope: {
      ngModel: '=ngModel'
    },
    controler: 'DatepickerCtrl'
  };
});
