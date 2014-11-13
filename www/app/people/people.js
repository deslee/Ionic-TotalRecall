angular.module('tr.people', [])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('nav.people', {
      url: '/people',
      views: {
        'nav-people': {
          templateUrl: 'app/people/people.html',
          controller: function($scope, objects) {
            $scope.$on('objectsAdded', function() {
              $scope.objects = objects.people();
            });
            $scope.objects = objects.people();
          }
        }
      }
    })
});
