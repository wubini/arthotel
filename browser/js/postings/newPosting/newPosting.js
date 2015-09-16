app.config(function ($stateProvider) {
    $stateProvider.state('newPosting', {
        url: '/postings/add/newPost',
        templateUrl: 'js/postings/newPosting/newposting.html',
        controller: 'newPostingCtrl'

    });
});

app.controller('newPostingCtrl', function ($scope, AuthService, $state) {
    $scope.range = [0, 100, 200, 300];

    $scope.newPost = {};


    $scope.sendPost = function(postInfo){
      console.log('hi', postInfo);
      
    };

});
