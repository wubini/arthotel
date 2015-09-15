app.config(function ($stateProvider) {
    $stateProvider.state('privatePage', {
        url: '/me',
        templateUrl: 'js/privatePages/privatePage.html',
        controller: 'privatePageCtrl',
        resolve: {
            allUsers: function(UserFactory){
                return UserFactory.getAllUsers();
            }
        }
    });
});


app.controller('privatePageCtrl', function ($scope, AuthService, $state, allUsers) {
    console.log(allUsers);
    $scope.client = false;
    $scope.activeJobs = [{
        name: 'Project1',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgXI7ScOx4mJylaE_DHY_T7Xs9VYuelvlADNELc3V6f2ssByA7QLBb08',
        endDate: 'September 17, 2015',
        _id: '55f81ca3cf14af441f22fd6b',
        artist: {
            name: 'Artist',
            _id: 1234254
        },
        client: {
            name: 'client',
            _id: 8897234098
        }
    },{
        name: 'Project2',
        photo: 'https://my.vetmatrixbase.com/clients/12679/images/Gorgeous_puppies.jpg',
        artist: {
            name: 'Artist',
            _id: 123424245
        },
        client: {
            name: 'client',
            _id: 1234254
        }

    }];
});