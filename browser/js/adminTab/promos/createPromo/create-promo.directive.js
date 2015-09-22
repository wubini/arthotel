app.directive('createPromo', PromoFactory => {
  return {
    restrict: 'E',
    templateUrl: 'js/adminTab/promos/createPromo/create-promo-template.html',
    link: scope => {
      scope.createPromo = newPromo => {
        PromoFactory.createPromo(newPromo);
      };
    },
    controller: 'promoCtrl'
  };
});
