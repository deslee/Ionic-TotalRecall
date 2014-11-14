// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
  'tr.service',
  'tr.home',
  'tr.objects',
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
      controller: function($scope, $rootScope, $state, $localstorage, $location,$ionicViewService, trObject, objects) {
        var page = $rootScope.navPage = {title: "Total Recall"};

        page.title = 'Total Recall';

        page.back = function() {
          $state.go(page.previousState);
        }

        page.search = function() {
          $state.go('nav.search');
        }

        $scope.$on('$stateChangeSuccess', function() {

        });

        $scope.delete = function(object) {
          if(confirm("Are you sure?")) {
            objects.delete(object.id);
          }
        }

        $scope.create = function(singular) {
          $state.go('nav.create-' + singular)
        }

        $scope.detail = function(object) {
          trObject.detail(object);
        }

        $scope.modify = function(object) {
          trObject.modify(object);
        }
      }
    })

    .state('nav.search', {
      url: '/search',
      views: {
        'nav-search': {
          templateUrl: 'app/directives/searchPage.html',
          controller: function($scope, setTitle, objects) {
            setTitle('Search');
            $scope.searchPage = {
              query: '',
              results: objects.all()
            }

            $scope.$watch('searchPage.query', function(newQuery, oldQuery) {
              $scope.searchPage.results = objects.all().filter(function(object) {
                return object.name.toLowerCase().indexOf(newQuery.toLowerCase()) != -1 || (object.notes && object.notes.toLowerCase().indexOf(newQuery.toLowerCase()) != -1);
              });
            })
          }
        }
      }
    });

    $urlRouterProvider.otherwise('/home');

});
