app.directive('saveRequest', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/detailedPosting/saverequest.html',
        link: function(scope){
          scope.show=true;

          console.log(scope.currentUser._id);
          if(scope.currentUser._id === scope.posting.client._id || scope.posting.status !== 'unstarted'){
            scope.show=false;
          }
          scope.toolTip = "";
          if(!scope.currentUser){
            scope.toolTip = "You must be logged in to request a project!";
          }
        }

    };
});
