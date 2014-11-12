angular.module('tr.objects', [])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('nav.create-object', {
      url: '/create?type',
      views: {
        'nav-create-object': {
          templateUrl: 'app/objects/create-object.html',
          controller: function($scope, $localstorage, $stateParams, objects) {
            $scope.availableTypes = ['People', 'Places', 'Things'];
            $scope.object = {type: $stateParams.type || undefined};
            $scope.create = function(object) {
              console.log(objects.all())
            }
          }
        }
      }
    })
});
