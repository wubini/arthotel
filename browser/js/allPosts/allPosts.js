app.config(function ($stateProvider) {
    $stateProvider.state('allPosts', {
        url: '/post',
        templateUrl: 'js/allPosts/allPosts.html',
        controller: 'allPostCtrl'

    });
});

app.controller('allPostCtrl', function ($scope, AuthService, $state) {
  $scope.posts = [
    {
      title: 'Project',
      client: {
        name: 'Beckylee'
      },
      description: "this is cool",
      datePosted: new Date()
    },
    {
      title: 'Project',
      client: {
        name: 'Beckylee'
      },
      description: "this is cool",
      datePosted: new Date()
    },
    {
      title: 'Project',
      client: {
        name: 'Beckylee'
      },
      description: "this is cool",
      datePosted: new Date()
    },
    {
      title: 'Project',
      client: {
        name: 'Beckylee'
      },
      description: "this is cool",
      datePosted: new Date()
    }
  ];
});
