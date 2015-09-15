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
    },
    getUserById: function(id)
    {
      return $http.get('/api/users/'+id)
      .then(function(response)
      {
        return response.data;
      })
    },
    getSavedPostingsForUser: function(userId)
    {
      return $http.get('/api/users/'+id+'/saved')
      .then(function(response)
      {
        return response.data;
      });
    },
    getRequestedPostingsForUser: function(userId)
    {
      return $http.get('/api/users/'+id+'/requested')
      .then(function(response)
      {
        return response.data;
      });
    }
  }
})
