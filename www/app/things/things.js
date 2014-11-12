angular.module('tr.things', [])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('nav.things', {
      url: '/things',
      views: {
        'nav-things': {
          templateUrl: 'app/things/things.html',
          controller: function($scope) {
            $scope.text = "hello world!"
          }
        }
      }
    })
});
