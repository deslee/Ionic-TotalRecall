angular.module('tr.places', [])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('nav.places', {
      url: '/places',
      views: {
        'nav-places': {
          templateUrl: 'app/places/places.html',
          controller: function($scope) {
          }
        }
      }
    })
});
