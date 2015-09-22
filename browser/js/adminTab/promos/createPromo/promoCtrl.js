app.controller('promoCtrl', ($scope, UserFactory, PromoFactory) => {
  $scope.createdPromo = {};
  $scope.createNewPromo = newPromo =>
    PromoFactory.createPromo(newPromo);

  UserFactory.getAllUsers()
    .then(users => {
      $scope.users = users;
      return $scope.users;
    })
    .then(users => {
      users.forEach(user => {
        user.selected = false;
      });
    });

    $scope.selected = [];
    $scope.createdPromo.user = [];
    $scope.addUsers = () => {
      $scope.selected.forEach(obj => {
          $scope.createdPromo.user.push(obj._id);
      });
    };

    $scope.resetForm = () => {
      document.getElementById("newPromoForm").reset();
    }

    $scope.verify = () => {
      $scope.addUsers();
      if($scope.createdPromo.code.split(" ").length > 1) {
        alert('There must be no spaces in the promo code');
        return;
      }
      if($scope.createdPromo.discount > 99 || $scope.createdPromo.discoun < 1){
         alert('discount must be between 0-100');
         return;
       }
      if($scope.createdPromo.start > $scope.createdPromo.end) {
        alert('start date must be before end date');
        return;
      }
      if($scope.createdPromo.user.length < 1) {
        alert('you must select some users first')
        return;
      }
      console.log($scope.createdPromo);
      PromoFactory.createPromo($scope.createdPromo)
        .then(response => {
          $scope.resetForm
          alert('you created a new promo');
        });
    };

      $scope.start = new Date();
      $scope.end = new Date();

      $scope.minStartDate = 0; //fixed date
      $scope.maxStartDate = $scope.end; //init value
      $scope.minEndDate = $scope.start; //init value
      $scope.maxEndDate = $scope.end; //fixed date same as $scope.maxStartDate init value

      $scope.$watch('start', function(v){
        $scope.minEndDate = v;
      });
      $scope.$watch('end', function(v){
        $scope.maxStartDate = v;
      });

      $scope.openStart = function() {
          $scope.startOpened = true;
      };

      $scope.openEnd = function() {
          $scope.endOpened = true;
      };

      $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
      };    $scope.status = {
      opened: false
    };
});
