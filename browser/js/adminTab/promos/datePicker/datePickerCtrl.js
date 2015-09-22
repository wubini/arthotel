app.controller('DatepickerCtrl', $scope => {
  $scope.today = function() {
    $scope.start = new Date();
  };
  $scope.tomorrow = () => {
    $scope.end = new Date();
    $scope.end.setDate($scope.end.getDate()+1);
  };

  $scope.today();
  $scope.tomorrow();

  $scope.clear = function () {
    $scope.start = null;
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? $scope.start : new Date();
  };
  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open = $event => {
    $scope.status.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.format = 'dd-MMMM-yyyy';

  $scope.status = {
    opened: false
  };
});
