app.controller('cartCtrl',function($scope,sessionPostings){
	$scope.cartPostings= sessionPostings.description;
	console.log("session postings",sessionPostings);
})