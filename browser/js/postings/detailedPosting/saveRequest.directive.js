app.directive('saveRequest', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/detailedPosting/saverequest.html',
        link: function(scope){
          scope.toolTip = "";
          if(!scope.currentUser){
            scope.toolTip = "You must be logged in to request a project!";
          }
        }

    };
});
