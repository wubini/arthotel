app.directive('unassignedJobs', ($state, PromoFactory) => {
  return {
    restrict: 'E',
    templateUrl: 'js/privatePages/directives/unassignedJobs/unassignedJobs.html',
    scope: {
      project: '=project',
      artists: '=artists'
    },
    link: (scope, elem, attr) => {
      scope.isCollapsed = true;
      scope.artists = _.pluck(scope.project.artistsWhoRequested, "user");

      scope.code;
      scope.codePass = false;
      scope.promo;
      scope.checkCode = (client) => {
        PromoFactory.getAllPromos()
          .then(promos => {
            for(var i=0; i < promos.length; i++) {
              if(promos[i].code === scope.code){
                for(var j = 0; j < promos[i].user.length; j++) {
                  if(promos[i].user[j]._id === client) {
                    scope.codePass = true;
                    scope.promo = promos[i];
                  }
                }
                }
              }
              scope.applyCode(scope.code);
            });
      };

      scope.applyCode = (promo) => {
        if(scope.codePass) {
          alert(`Your code has worked, you are dicounted ${scope.promo.discount}%`);
          Math.floor(scope.project.price *= (1-(scope.promo.discount/100)));
          $scope.digest();
        } else {
          alert('That\'s not a real code, stop trying to steal!');
        }
      };

    }
  };
});
