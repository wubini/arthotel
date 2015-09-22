app.config(function($stateProvider){
	$stateProvider
	.state('loggedOutCart',{
		url: '/cart',
		templateUrl: '/js/cart/cart.html',
		controller :'cartCtrl',
		resolve : {
			sessionPostings: function(PostingFactory){
				console.log("hola");
				return PostingFactory.getPostingsInCart().then(function(data){
					return PostingFactory.getLoggedOutCart(data);
					
				})
			}
		}
	})
})