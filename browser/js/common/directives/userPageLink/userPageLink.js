app.directive("userPageLink", () => {
  return {
    scope: {
      user: '='
    },
    restrict: 'EA',
    templateUrl: 'js/common/directives/userPageLink/userPageLink.html',
    controller: ($scope) => {
    }
  }
});
