app.factory("PostingFactory", ($http, $q) => {
  return {
    getAllPostings: () => {
      return $http.get(`/api/postings`)
        .then(response => response.data);
    },
    getPostsForUser: userId => {
      return $http.get(`/api/users/${userId}/postings`)
        .then(response => response.data);
      },
    getDonePostsForUser: (userId,role) => {
      return $http.get(`/api/users/${userId}/postings/done/${role}`)
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
    getLoggedOutCart: (data) => {
      var returnArr=[];
      for(var i=0; i<data.length; i++){
        returnArr.push($http.get(`/api/postings/`+data[i]));
      }
      return Promise.all(returnArr).then(function(tempCart){
          var hold = tempCart.map(function(tempThing){       
          return tempThing.data;
        });
          return hold;
       })
      },
    getPostingsInCart: () => {
      return $http.get(`/api/cart`)
      .then(response => response.data);
    },

    // creates a new posting
    createNewPosting: postInfo => {
      return $http.post(`/api/postings/`, {postInfo})
        .then(response => response.data);
    },
    //updates a posting after it has been edited
    updatePostingById: posting => {
      return $http.put(`/api/postings/${posting._id}`, {
        newPost: posting,
        action: 'fullUpdate'
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
        section: 'Requested',
        accept: artist
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

    removePostingFromCart: (postingId) => {
      return $http.delete(`/api/cart/${postingId}`)
      .then(response => response.data);
    },

    changePostingStatus: (postingId, newStatus) => {
      return $http.put(`/api/postings/${postingId}`, {
        status: newStatus
      })
      .then(response => response.data);
    },
    submitReview: (posting, newStatus, role, stars, text) => {
      var body = {};
      body.status = newStatus;
      body.reviews = posting.reviews || {};
      body.reviews[role] = {
        stars: stars,
        text: text
      };
      return $http.put(`/api/postings/${posting._id}`, body)
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
