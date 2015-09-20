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
    // checks when a user logs in if there were items in the cart of the guest
    // moves them to the users logged in cart
    saveCartPostingsToUser: () => {
      return $http.put(`/api/postings`)
        .then(response => response.data);
    },
    // creates a new posting
    createNewPosting: postInfo => {
      return $http.post(`/api/postings/`, {
        postInfo
      })
        .then(response => response.data);
    },
    //updates a posting after it has been edited
    updatePostingById: posting => {
      return http.put(`/api/postings/${posting._id}`, {
        newPost: posting
      })
      .then(response => response.data);
    },
    //saves a posting to a users cart
    savePostingToCart: postingId => {
      return $http.put(`/api/postings/${postingId}`, {
          action: "save"
        })
        .then(response => response.data);
    },
    // for requesting a posting and having it save to a users requested postings
    //section
    requestPosting: postingId => {
      return $http.put(`/api/postings/${postingId}`, {
          action: 'update',
          section: 'Requested'
        })
        .then(response => response.data);
    },
    // Sets an Artist to be artist who is doing the work. Removes all from artistsWhoRequested
    // Sets status to "started"
    // sets posting.artist to artist
    assignPostingToArtist: (artist, postingId) => {
      return $http.put(`/api/postings/${postingId}`, {
        action: "assign",
        section: 'Requested'
      })
        .then(response => response.data);
    },
    // for rejecting a request by an artist. Removes them from the array of artistsWhoRequested
    rejectArtist: (artist, postingId) => {
      return $http.put(`/api/postings/${postingId}`, {
        action: 'reject',
        section: 'Requested',
      })
        .then(response => response.data);
    },
    // Removes an artistsID from artistsWhoSaved on posting page
    removeSaveArtist: (artist, postingId) => {
      return $http.put(`/api/postings/${postingId}`, {
        action: 'reject',
        section: 'Saved'
      })
        .then(response => response.data);
    },
    changePostingStatus: (postingId, newStatus) => {
      return $http.put(`/api/postings/${postingId}`, {
        status: newStatus
      })
      .then(response => response.data);
    },
    submitReview: (postingId, newStatus, role, stars, text) => {
      return $http.put(`/api/postings/${postingId}`, {
        status: newStatus,
        reviews: {
          type: role,
          stars: stars,
          text: text
        }
      })
      .then(response => response.data);
    },
    updatePost: (updatedPost) => {
      return $http.put(`/api/postings/${updatedPost._id}`, {
        title: updatedPost.title,
        location: updatedPost.location,
        price: updatedPost.price,
        startDate: updatedPost.startDate,
        size: updatedPost.size,
        tags: updatedPost.tags,
        photos: updatedPost.photos
      })
      .then(response => response.data)
    }
  };
});
