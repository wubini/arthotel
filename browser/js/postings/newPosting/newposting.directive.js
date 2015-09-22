app.directive('newPosting', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/newPosting/newPostingForm.html',
        link: function(scope){
          

          $('#tagsDiv input').tagsinput({
            confirmKeys: [13, 44, 32]
          });

          $('#tagsDiv input').on('itemAdded', function(event) {
            console.log('before: ', scope.newPost.tags)
            scope.newPost.tags.push(event.item);
            console.log(scope.newPost.tags);
            scope.$digest();
          });

        }
    };
});
