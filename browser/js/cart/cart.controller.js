app.controller('cartCtrl',function($scope,sessionPostings){
	$scope.cartPostings= sessionPostings;
	console.log("session postings",sessionPostings);
	console.log("cartion postings",$scope.cartPostings);
})