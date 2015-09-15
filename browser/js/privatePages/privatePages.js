app.config(function ($stateProvider) {
    $stateProvider.state('privatePage', {
        url: '/me',
        templateUrl: 'js/privatePages/privatePage.html',
        controller: 'privatePageCtrl',
        resolve: {
            allPostings: function(PostingFactory){
                return PostingFactory.getAllPostings();
            }
        }
    });
});


app.controller('privatePageCtrl', function ($scope, AuthService, $state, allPostings, Session) {
    console.log(allPostings);

    $scope.client = true;
    $scope.activeJobs = [];

    //will need to change 55f81ca3cf14af441f22fd69 to Session.id
    if($scope.client){
        allPostings.forEach(function(post){
            if(post.client == Session.id && status == 'started'){
                $scope.activeJobs.push(post);
            }
        });
    }else{
        allPostings.forEach(function(post){
            if(post.artist == Session.id && status == 'started'){
                $scope.activeJobs.push(post);
            }
        });
    }
    // $scope.activeJobs = [{
    //     name: 'Project1',
    //     photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgXI7ScOx4mJylaE_DHY_T7Xs9VYuelvlADNELc3V6f2ssByA7QLBb08',
    //     endDate: 'September 17, 2015',
    //     _id: '55f81ca3cf14af441f22fd6b',
    //     artist: {
    //         name: 'Artist',
    //         _id: 1234254
    //     },
    //     client: {
    //         name: 'client',
    //         _id: 8897234098
    //     }
    // },{
    //     name: 'Project2',
    //     photo: 'https://my.vetmatrixbase.com/clients/12679/images/Gorgeous_puppies.jpg',
    //     artist: {
    //         name: 'Artist',
    //         _id: 123424245
    //     },
    //     client: {
    //         name: 'client',
    //         _id: 1234254
    //     }

    // }];
});