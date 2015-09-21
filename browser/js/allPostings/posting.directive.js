app.directive('posting', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/allPostings/posting.html',
        link: function(scope){

            scope.editing = false;
            scope.changed = false;
            scope.status = scope.posting.status;

            scope.toggleEditing = function(){
              //have current be first selected
             // var options = angular.element(document.querySelector('select option:selected'));
             // var currentStatus = angular.element(document.querySelector('select option[value='+scope.status+']'));
            //  currentStatus.prop('selected', true);
              scope.editing=!scope.editing;
              if(scope.changed){
                //save changes!
                console.log(scope.status);
              }
            }
        }
    };
});
