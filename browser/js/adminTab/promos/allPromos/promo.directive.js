app.directive('promo', (PromoFactory, $state) => {
  return {
    restrict: 'E',
    templateUrl: `js/admintab/promos/allPromos/promo.template.html`,
    link: scope => {
      PromoFactory.getAllPromos()
        .then(promos => {
          scope.promos = promos;
          scope.allUsers = [];
          if(scope.promos.length) {
            scope.promos.forEach(promo => {
              promo.user.forEach(proUser => {
                scope.allUsers.push(proUser.displayName);
              });
            });
          }
        });

      scope.deletePromo = promoId => {
        PromoFactory.deletePromo(promoId)
          .then(response => {
            alert('Promo has been eliminated');
            $state.reload();
          });
      };

    }
  };
});
