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
          controller: function($scope, $state, objects) {
            $scope.$on('objectsAdded', function() {
              $scope.objects = objects.people();
            });
            $scope.objects = objects.people();

            $scope.delete = function(object) {
              if(confirm("Are you sure?")) {
                objects.delete(object.id);
              }
            }
          }
        }
      }
    })

    .state('nav.create-person', {
      url: '/people/create',
      views: {
        'nav-people': {
          templateUrl: 'app/people/create.html',
          controller: function($scope, $state, objects) {
            $scope.object = {type: 'Person'}
            $scope.create = function(object) {
              objects.add(object);
              $state.go('nav.people');
            }
          }
        }
      }
    })

    .state('nav.modify-person', {
      url: '/people/modify/:id',
      views: {
        'nav-people': {
          templateUrl: 'app/people/modify.html',
          controller: function($scope, $state, $stateParams, objects) {
            $scope.object = objects.get($stateParams.id)
            $scope.save = function(object) {
              objects.modify(object);
              $state.go('nav.people');
            }
          }
        }
      }
    })
});
