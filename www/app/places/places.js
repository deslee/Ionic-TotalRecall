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
          controller: function($scope, $state, objects) {
            $scope.$on('objectsAdded', function() {
              $scope.objects = objects.places();
            });
            $scope.objects = objects.places();

            $scope.delete = function(object) {
              if(confirm("Are you sure?")) {
                objects.delete(object.id);
              }
            }
          }
        }
      }
    })

    .state('nav.create-place', {
      url: '/places/create',
      views: {
        'nav-places': {
          templateUrl: 'app/places/create.html',
          controller: function($scope, $state, objects) {
            $scope.object = {type: 'Place'}
            $scope.create = function(object) {
              objects.add(object);
              $state.go('nav.places');
            }
          }
        }
      }
    })

    .state('nav.modify-place', {
      url: '/places/modify/:id',
      views: {
        'nav-places': {
          templateUrl: 'app/places/modify.html',
          controller: function($scope, $state, $stateParams, objects) {
            $scope.object = objects.get($stateParams.id)
            $scope.save = function(object) {
              objects.modify(object);
              $state.go('nav.places');
            }
          }
        }
      }
    })
});
