app.directive("artistDetails", function(UserFactory, $state)
{
  return {
    restrict: 'EA',
    scope: {
      artist:"=",
      currentUser:"=",
      index: '='
    },
    templateUrl: 'js/allArtistsPage/artist.details.html',
    link: function(scope){

      scope.deleteUser = function(){
        UserFactory.deleteUser(scope.artist._id)
        .then(function(){
          $state.go('privatePage.adminTab', {}, {reload:true})
        });

      };

      scope.changeAdmin = function(){
        UserFactory.editUser(scope.artist)
        .then(function(updatedUser){
          $state.go('privatePage.adminTab', {}, {reload:true})
        });
      };

      scope.resetPassword = function(){
        console.log('reset: ',scope.artist);
        if(!scope.artist.password) return;
        scope.artist.resetPassword = true;

        UserFactory.editUser(scope.artist)
        .then(function(updatedUser){
          $state.go('privatePage.adminTab', {}, {reload:true});
        })
      }
    }
  }
});
