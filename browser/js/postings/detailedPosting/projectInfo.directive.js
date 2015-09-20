app.directive('projectInfo', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/detailedPosting/projectInfo.html',
        link: function(scope){
          $('#tagsDiv input').tagsinput({
            confirmKeys: [13, 44, 32]
          });
        }
    };
});
