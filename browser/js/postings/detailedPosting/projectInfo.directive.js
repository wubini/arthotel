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
              PostingFactory
            }

        }
    };
});
