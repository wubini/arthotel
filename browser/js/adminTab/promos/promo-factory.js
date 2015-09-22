app.factory('PromoFactory', $http => {
  return {
    getAllPromos: () => {
      return $http.get(`/api/promos`)
        .then(response => response.data);
    },
    
  }
})
