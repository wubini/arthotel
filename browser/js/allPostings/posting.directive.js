app.directive('posting', function (PostingFactory, $state) {
    return {
        restrict: 'E',
        templateUrl: 'js/allPostings/posting.html',
        link: function(scope){

            scope.editing = false;
            scope.changed = false;

            scope.statuses.forEach(function(status, i){
              if(status.status === scope.posting.status){
                scope.newStatus = scope.statuses[i];
              }
            });

            scope.toggleEditing = function(){
              //have current be first selected
             // var options = angular.element(document.querySelector('select option:selected'));
             // var currentStatus = angular.element(document.querySelector('select option[value='+scope.status+']'));
            //  currentStatus.prop('selected', true);
              scope.editing=!scope.editing;
              if(scope.changed){
                //save changes!
                console.log(scope.newStatus);
                scope.posting.status = scope.newStatus.status;
                PostingFactory.updatePostingById(scope.posting)
                .then(function(updatedPost){
                  $state.go('privatePage.adminTab', {}, {reload:true})

                });

              }
            }


        }
    };
});
