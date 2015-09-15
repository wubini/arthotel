app.config(function ($stateProvider) {
    $stateProvider.state('allPostings', {
        url: '/postings',
        templateUrl: 'js/postings/allPostings/allPostings.html',
        controller: 'allPostingsCtrl'
    });
});

app.controller('allPostingsCtrl', function ($scope, AuthService, $state, PostingFactory) {
  PostingFactory.getAllPostings()
  .then(function(postings)
  {
    $scope.postings = postings;
  });
});
