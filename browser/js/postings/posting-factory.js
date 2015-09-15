app.factory("PostingFactory", function($http)
{
  return {
    getAllPostings: function()
    {
      return $http.get('/api/postings')
      .then(function(response)
      {
        return response.data;
      });
    },
    getPostingById: function(id)
    {
      return $http.get('/api/postings/'+id)
      .then(function(response)
      {
        return response.data;
      });
    }
  };
});
