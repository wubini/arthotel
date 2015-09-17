app.factory("UserFactory", function($http)
{
  return {
    getAllUsers: function()
    {
      return $http.get('/api/users')
      .then(function(response)
      {
        return response.data;
      });
    },
    getUserById: function(id)
    {
      return $http.get('/api/users/'+id)
      .then(function(response)
      {
        return response.data;
      });
    },
    getSavedPostingsForUser: function(userId)
    {
      return $http.get('/api/users/'+userId+'/saved')
      .then(function(response)
      {
        return response.data;
      });
    },
    getRequestedPostingsForUser: function(userId)
    {
      return $http.get('/api/users/'+userId+'/requested')
      .then(function(response)
      {
        return response.data;
      });
    },
    getActivePostingsForArtist: function(userId)
    {
      return $http.get('/api/users/'+userId+'/active/artist')
      .then(function(response){
        return response.data;
      });
    },
    getActivePostingsForClient: function(userId)
    {
      return $http.get('/api/users/'+userId+'/active/client')
      .then(function(response){
        return response.data;
      });
    },
    editUser: function(user)
    {
      console.log("edituser called");
      return $http.put(`/api/users/${user._id}/`, user)
      .then(function(response)
      {
        return response.data;
      });
    }
  }
})
