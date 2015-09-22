app.directive('newPosting', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/newPosting/newPostingForm.html',
        link: function(scope){
          

          $('#tagsDiv.newPost input').tagsinput({
            confirmKeys: [13, 44, 32]
          });

          $('#tagsDivNew.newPost input').on('itemAdded', function(event) {
            scope.newPost.tags.push(event.item);
            scope.$digest();
          });

          $('#tagsDiv.newPost input').on('itemRemoved', function(event) {
            var i =scope.newPost.tags.indexOf(event.item);
            scope.newPost.tags.splice(i, 1);
            scope.$digest();
          });

        }
    };
});
