// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
  'tr.service',
  'tr.home',
  'tr.people',
  'tr.places',
  'tr.things',
  'tr.emergency',
  'tr.directives'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('nav', {
      abstract: true,
      templateUrl: "app/tabs.html",
      controller: function($scope, $state, $localstorage, $location, objects) {
        var page = $scope.navPage = {title: "Total Recall"};
        $scope.objectName = 'Object'
        page.title = 'Total Recall'

        $scope.$on('$stateChangeSuccess', function() {
          switch($state.current.name) {
            case 'nav.home':
              $scope.objectName = 'object';
              page.subtitle = 'Dashboard'
              break;
            case 'nav.people':
              $scope.objectName = 'person';
              page.subtitle = 'People'
              break;
            case 'nav.create-person':
              page.subtitle = 'Create Person'
              break;
            case 'nav.modify-person':
              page.subtitle = 'Modify Person'
              break;
            case 'nav.places':
              $scope.objectName = 'place'
              page.subtitle = 'Places'
              break;
            case 'nav.create-place':
              page.subtitle = 'Create Place'
              break;
            case 'nav.modify-place':
              page.subtitle = 'Modify Place'
              break;
            case 'nav.things':
              $scope.objectName = 'thing'
              page.subtitle = 'Things'
              break;
            case 'nav.create-thing':
              page.subtitle = 'Create Thing'
              break;
            case 'nav.modify-thing':
              page.subtitle = 'Modify Thing'
              break;
            case 'nav.emergency':
              $scope.objectName = 'object'
              page.subtitle = 'Emergencies'
              break;
          }
        });
      }
    });

    $urlRouterProvider.otherwise('/home');

});
