app.config(function($stateProvider){
	$stateProvider.state('loggedOutCart',{
		url: '/cart',
		templateUrl: '/js/cart/cart.html',
		controller :'cartCtrl',
		resolve :{
			sessionPostings: function(PostingFactory){
				return PostingFactory.getPostingsInCart();
			}
		}


	})
})