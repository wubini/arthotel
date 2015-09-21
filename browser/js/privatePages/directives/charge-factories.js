app.factory('chargeFactory', ($http) => {
  return {
    getChargeById: (chargeId) => {
      return $http.get(`/api/charges/${chargeId}`)
      .then(response => response.data);
    },
    setCharge: () => {
      return $http.post(`api/charges/`)
      .then(response => response.data);
    }
  };
});
