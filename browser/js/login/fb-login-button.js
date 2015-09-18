app.directive("fb", function()
{
  return {
    template: '<div ng-click="facebookLogin()" class="btn btn-social btn-green"><i class="fa fa-facebook"></i>Login with Facebook</div>'
  };
})
