app.directive('promo', (PromoFactory) => {
  return {
    restrict: 'E',
    templateUrl: `js/admintab/promos/allPromos/promo.template.html`,
    link: scope => {
      PromoFactory.getAllPromos()
        .then(promos => scope.promos = promos);
    }
  };
});
