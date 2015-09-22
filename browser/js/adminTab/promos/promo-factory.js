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
    createPromo: (promo) => {
      return $http.post(`/api/promos`, {
        promo: promo
      })
        .then(response => response.data);
    },
    updatePromo: (promoId, newPromo) => {
      return $http.put(`/api/promos/${promoId}`,{
        newPromo: newPromo
      })
        .then(response => response.data);
    }
  };
});
