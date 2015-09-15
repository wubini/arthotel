app.config(function ($stateProvider) {
    $stateProvider.state('allPosts', {
        url: '/postings',
        templateUrl: 'js/posts/allPosts/allPosts.html',
        controller: 'allPostCtrl'
    });
});

app.controller('allPostCtrl', function ($scope, AuthService, $state, PostFactory) {
  PostFactory.getAllPosts()
  .then(function(posts)
  {
    $scope.posts = posts;
  });
});
