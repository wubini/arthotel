app.directive("artistDetails", function()
{
  return {
    restrict: 'EA',
    scope: {
      artist:"="
    },
    templateUrl: 'js/allArtistsPage/artist.details.html'
  }
});
