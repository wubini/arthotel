app.directive('projectInfo', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/detailedPosting/projectInfo.html',
        link: function(scope){
          scope.editing = false;

          scope.toggleEditing = function(){
            scope.editing = !scope.editing;
          }
        }
    };
});
