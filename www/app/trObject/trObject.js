var types = {person: 'people', place: 'places', thing: 'things', emergency: 'emergencies'};

angular.module('tr.objects', [])
.config(function($stateProvider, $urlRouterProvider) {

  Object.keys(types).forEach(function(singular) {
    var plural = types[singular];
    var listState = {
      url: '/' + plural,
      views: {}
    };
    listState.views['nav-' + plural] = {
      templateUrl: 'app/trObject/list.html',
      controller: function($scope, $state, objects) {
        $scope.$on('objectsAdded', function() {
          $scope.objects = objects[plural]();
        });
        $scope.objects = objects[plural]();

        $scope.delete = function(object) {
          if(confirm("Are you sure?")) {
            objects.delete(object.id);
          }
        }
      }
    };

    var createState = {
      url: '/' + plural + '/create',
      views: {}
    }
    createState.views['nav-' + plural] = {
      templateUrl: 'app/trObject/form.html',
      controller: function($scope, $state, objects) {
        $scope.object = {type: singular[0].toUpperCase() + singular.slice(1)}
        $scope.save = function(object) {
          objects.add(object);
          $state.go('nav.' + plural);
        }
      }
    };

    var modifyState = {
      url: '/'+plural+'/modify/:id',
      views: {}
    }
    modifyState.views['nav-' + plural] = {
      templateUrl: 'app/trObject/form.html',
      controller: function($scope, $state, $stateParams, objects) {
        $scope.object = objects.get($stateParams.id)
        $scope.save = function(object) {
          objects.modify(object);
          $state.go('nav.' + plural);
        }
      }
    }

    $stateProvider
      .state('nav.' + plural, listState)
      .state('nav.create-' + singular, createState)
      .state('nav.modify-' + singular, modifyState)
  });
});
