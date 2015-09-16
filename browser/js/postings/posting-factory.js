app.factory("PostingFactory", function($http) {
  return {
    getAllPostings: function() {
      return $http.get('/api/postings')
        .then(function(response) {
          return response.data;
        });
    },
    getPostsForUser: function(userId) {
      return $http.get('/api/users/' + userId + '/postings')
        .then(function(response) {
          return response.data;
        });
    },
    getPostingById: function(id) {
      return $http.get('/api/postings/' + id)
        .then(function(response) {
          return response.data;
        });
    },
    savePostingToCart: function(id) {
      return $http.post('/api/postings/' + id, {
          action: "save"
        })
        .then(function(response) {
          return response.data;
        });
    },
    requestPosting: function(id) {
      return $http.post('/api/postings/' + id, {
          action: "request"
        })
        .then(function(response) {
          return response.data;
        });
    },
    saveCartPostingsToUser: function() {
      return $http.put('/api/postings')
        .then(function(response) {
          return response.data;
        });
    }
  };
});
