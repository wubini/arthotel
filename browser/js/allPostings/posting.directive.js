app.directive('posting', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/allPostings/posting.html',
        link: function(scope){

            scope.editing = false;
            scope.changed = false;
            scope.status = scope.posting.status;
            console.log('before ', scope.statuses);

            scope.toggleEditing = function(){
              //have current be first selected
             // var options = angular.element(document.querySelector('select option:selected'));
              console.log(scope.status);
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
