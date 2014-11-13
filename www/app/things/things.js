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
          controller: function($scope, $state, objects) {
            $scope.$on('objectsAdded', function() {
              $scope.objects = objects.things();
            });
            $scope.objects = objects.things();

            $scope.delete = function(object) {
              if(confirm("Are you sure?")) {
                objects.delete(object.id);
              }
            }
          }
        }
      }
    })

    .state('nav.create-thing', {
      url: '/things/create',
      views: {
        'nav-things': {
          templateUrl: 'app/things/create.html',
          controller: function($scope, $state, objects) {
            $scope.object = {type: 'Thing'}
            $scope.create = function(object) {
              objects.add(object);
              $state.go('nav.things');
            }
          }
        }
      }
    })

    .state('nav.modify-thing', {
      url: '/things/modify/:id',
      views: {
        'nav-things': {
          templateUrl: 'app/things/modify.html',
          controller: function($scope, $state, $stateParams, objects) {
            $scope.object = objects.get($stateParams.id)
            $scope.save = function(object) {
              objects.modify(object);
              $state.go('nav.things');
            }
          }
        }
      }
    })
});
