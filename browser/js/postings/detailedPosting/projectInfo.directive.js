app.directive('projectInfo', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/postings/detailedPosting/projectInfo.html',
        controller: ($scope, PostingFactory) => {
            $scope.editing = false;
            $scope.beforeEdit = {};
            $scope.tags = $scope.posting.tags;
            $scope.showTags = $scope.posting.tags.join(',');

            $scope.toggleEditing = () => $scope.editing = !$scope.editing;

            _.assign($scope.beforeEdit, $scope.posting);

            $scope.restoreValueToBefore = () => {
              console.log('before: ', $scope.beforeEdit);
              console.log('current: ', $scope.posting);
              // _.assign($scope.posting, $scope.beforeEdit);
              $scope.posting = _.clone($scope.beforeEdit, true);
              // $scope.posting = $scope.beforeEdit;

              $scope.toggleEditing();
              console.log('after: ', $scope.posting);
            }

            $scope.updatePosting = () => {
              $scope.posting.tags = $scope.tags;
              PostingFactory.updatePostingById($scope.posting);
              $scope.toggleEditing();
            };
          },
          link: scope => {

            $('#tagsDiv > input').val(scope.showTags);
            $('#tagsDiv input').tagsinput({
              confirmKeys: [13, 44, 32]
            });


          $('#tagsDiv input').on('itemAdded', function(event) {
            scope.tags.push(event.item);
            scope.$digest();
          });
        }
    };
});
