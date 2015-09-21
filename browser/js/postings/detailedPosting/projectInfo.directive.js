app.directive('projectInfo', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/detailedPosting/projectInfo.html',
        controller: ($scope, PostingFactory) => {
            $scope.editing = false;
            $scope.beforeEdit = {};

            $scope.toggleEditing = () => $scope.editing = !$scope.editing;

            _.assign($scope.beforeEdit, $scope.posting);

            $scope.restoreValueToBefore = () =>
              _.assign($scope.posting, $scope.beforeEdit);

            $scope.updatePosting = () => {
              PostingFactory.updatePostingById($scope.posting);
              $scope.toggleEditing();
            };
          },
          link: scope => {
            $('#tagsDiv input').tagsinput({
              confirmKeys: [13, 44, 32]
            });
        }
    };
});
