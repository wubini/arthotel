app.factory('PromoFactory', $http => {
  return {
    getAllPromos: () => {
      return $http.get(`/api/promos`)
        .then(response => response.data);
    },
    getPromoById: promoId => {
      return $http.get(`/api/promos/${promoId}`)
        .then(response => response.data);
    },
    
  }
})
