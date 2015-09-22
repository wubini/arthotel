app.directive('createPromo', PromoFactory => {
  return {
    restrict: 'E',
    templateUrl: 'js/adminTab/promos/createPromo/create-promo-template.html',
    controller: 'promoCtrl'
  };
});
