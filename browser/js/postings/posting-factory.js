app.factory("PostingFactory", $http => {
  return {
    getAllPostings: () => {
      return $http.get(`/api/postings`)
        .then(response => response.data);
    },
    getPostsForUser: userId => {
      return $http.get(`/api/users/${userId}/postings`)
        .then(response => response.data);
      },
    getDonePostsForUser: userId => {
      return $http.get(`/api/users/${userId}/postings/done`)
        .then(response => response.data);
    },
    getPostingById: id => {
      return $http.get(`/api/postings/${id}`)
        .then(response => response.data);
    },
    savePostingToCart: id => {
      return $http.post(`/api/postings/${id}`, {
          action: "save"
        })
        .then(response => response.data);
    },
    requestPosting: id => {
      return $http.post(`/api/postings/${id}`, {
          action: "request"
        })
        .then(response => response.data);
    },
    saveCartPostingsToUser: () => {
      return $http.put(`/api/postings`)
        .then(response => response.data);
  }
}
});
