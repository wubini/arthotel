app.directive("tagLinks", () => {
  return {
    scope: {
      tagsArray: '=',
      url: '=',
      delim: '='
    },
    restrict: 'EA',
    templateUrl: 'js/common/directives/tagLinks/tagLinks.html',
    controller: ($scope) => {
    }
  }
});
