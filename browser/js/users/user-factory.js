app.factory("UserFactory", function($http)
{
  return {
    getAllUsers: function()
    {
      return $http.get(`/api/users`)
      .then(response => response.data);
    },
    getUserById: function(id)
    {
      return $http.get(`/api/users/${id}`)
      .then(response => response.data);
    },
    getSavedPostingsForUser: function(userId)
    {
      return $http.get(`/api/users/${userId}/saved`)
      .then(response => response.data);
    },
    getRequestedPostingsForUser: function(userId)
    {
      return $http.get(`/api/users/${userId}/requested`)
      .then(response => response.data);
    },
    getActivePostingsForArtist: function(userId)
    {
      return $http.get(`/api/users/${userId}/active/artist`)
      .then(response => response.data);
    },
    getActivePostingsForClient: function(userId)
    {
      return $http.get(`/api/users/${userId}/active/client`)
      .then(response => response.data);
    }
  };
});
