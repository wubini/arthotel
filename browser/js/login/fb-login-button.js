app.directive("fb", function()
{
  return {
    template: '<div ng-click="facebookLogin()" class="btn btn-social btn-facebook"><i class="fa fa-facebook"></i>Login with Facebook</div>'
  };
})
