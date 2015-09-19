app.directive("artistDetails", function()
{
  return {
    restrict: 'EA',
    scope: {
      artist:"="
    },
    templateUrl: 'js/users/allArtists/artist.details.html'
  }
});
