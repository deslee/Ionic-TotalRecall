// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
  'tr.service',
  'tr.objects',
  'tr.home',
  'tr.people',
  'tr.places',
  'tr.things',
  'tr.emergency'
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
      controller: function($scope, $state, $localstorage, objects) {
        $scope.newObject = function() {
          var type = $state.current.name.split('.')[1];
          if ($state.current.name != 'nav.manage-object') {
            $state.go('nav.manage-object', {
              type: type[0].toUpperCase() + type.slice(1),
              crud: 'create'
            }).then(function($state) {
          });
          }
        }

        $scope.objectName = 'Object'

        $scope.$on('$stateChangeSuccess', function() {
          switch($state.current.name) {
            case 'nav.people':
              $scope.objectName = 'person'
              break;
            case 'nav.places':
              $scope.objectName = 'place'
              break;
            case 'nav.things':
              $scope.objectName = 'thing'
              break;
          }
        });

        $scope.delete = function(object) {
          if(confirm("Are you sure?")) {
            objects.delete(object.id);
          }
        }
      }
    });

    $urlRouterProvider.otherwise('/home');

});
