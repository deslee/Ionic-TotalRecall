/*
angular.module('tr.objects', [])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('nav.objects', {
      url: '/objects',
      abstract: true,
      templateUrl: 'app/objects.html',
      controller: function($scope, objects) {
        $scope.$on('objectsAdded', function() {
          $scope.objects = objects.people();
        });
        $scope.objects = objects.people();
      }
    })
});
/*