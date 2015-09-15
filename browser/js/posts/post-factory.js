app.factory("PostFactory", function($http)
{
  return {
    getAllPosts: function()
    {
      return $http.get('/api/posts')
      .then(function(response)
      {
        return response.data;
      });
    },
    getPostById: function(id)
    {
      return $http.get('/api/posts/'+id)
      .then(function(response)
      {
        return response.data;
      });
    }
  };
});
