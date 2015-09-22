app.factory("RatingFactory", () => {
  return {
    getRatingFromProjects: (projects, role) => {
      var totalRating = 0;
      var numReviews = 0;
      var reviewRole = role==='artist' ? 'client' : 'artist';

      projects.forEach(project => {
        if(project.reviews && project.reviews[reviewRole])
        {
          totalRating += project.reviews[reviewRole].stars;
          numReviews ++;
        }
      });

      return numReviews > 0? [totalRating/numReviews, numReviews] : [null, 0];
    }
  }
});
