angular.module('tr.home', [])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('nav.home', {
      url: '/home',
      views: {
        'nav-home': {
          templateUrl: 'app/home/home.html',
          controller: function($scope, $localstorage, setTitle) {
            setTitle('Dashboard')
            $scope.text = "hello world!"
          }
        }
      }
    })
});
