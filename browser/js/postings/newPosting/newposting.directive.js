app.directive('newPosting', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/newPosting/newPostingForm.html',
        link: function(scope){
          

          $('#tagsDiv input').tagsinput({
            confirmKeys: [13, 44, 32]
          });

        }
    };
});
