app.directive('potentialJobDetail', function()
{
  return {
    restrict: 'EA',
    scope: {
      posting: "="
    },
    templateUrl: 'js/privatePages/directives/potentialJobs/potential.job.detail.html',
    link: function(scope, element, attrs)
    {

    }
  }
});
