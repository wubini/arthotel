app.directive("artistDetails", function()
{
  return {
    restrict: 'EA',
    scope: {
      artist:"=",
      currentUser:"="
    },
    templateUrl: 'js/allArtistsPage/artist.details.html',
    link: function(scope){
      console.log('scope: ', scope);
    }
  }
});
