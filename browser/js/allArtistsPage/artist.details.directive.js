app.directive("artistDetails", function(UserFactory, $state)
{
  return {
    restrict: 'EA',
    scope: {
      artist:"=",
      currentUser:"="
    },
    templateUrl: 'js/allArtistsPage/artist.details.html',
    link: function(scope){
     
      scope.deleteUser = function(){
        UserFactory.deleteUser(scope.artist._id)
        .then(function(returned){
          $state.go('privatePage.adminTab', {}, {reload:true})
        });

      }
    }
  }
});
