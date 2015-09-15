app.factory("UserFactory", function($http)
{
  return {
    getAllUsers: function()
    {
      return $http.get('/api/users')
      .then(function(response)
      {
        return response.data;
      })
    }
  }
})
