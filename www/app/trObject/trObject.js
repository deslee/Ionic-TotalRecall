var types = {person: 'people', place: 'places', thing: 'things', emergency: 'emergencies'};

angular.module('tr.objects', [])
.config(function($stateProvider, $urlRouterProvider) {
  Object.keys(types).forEach(function(singular) {
    var plural = types[singular];
    var type = singular[0].toUpperCase() + singular.slice(1);

    var listState = {
      url: '/' + plural,
      views: {}
    };
    listState.views['nav-' + plural] = {
      templateUrl: 'app/trObject/list.html',
      controller: function($scope, $state, objects, trObject, setTitle) {
        $scope.singular = singular;
        setTitle('List of ' + plural)
        $scope.$on('objectsAdded', function() {
          $scope.objects = objects[plural]();
        });
        $scope.objects = objects[plural]();

        $scope.delete = function(object) {
          if(confirm("Are you sure?")) {
            objects.delete(object.id);
          }
        }

        $scope.create = function() {
          $state.go('nav.create-' + singular)
        }

        $scope.modify = function(object) {
          trObject.modify(object);
        }
      }
    };

    var createState = {
      url: '/' + plural + '/create',
      views: {}
    }
    createState.views['nav-' + plural] = {
      templateUrl: 'app/trObject/form.html',
      controller: function($scope, $state, objects, setTitle) {
        $scope.object = {type: type}
        setTitle('Create a ' + singular)
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
      controller: function($scope, $state, $stateParams, objects, setTitle) {
        setTitle('Modify a ' + singular)
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
}).factory('trObject', function($state) {
  return {
    modify: function(object) {
      var singular = object.type.toLowerCase();
      $state.go('nav.modify-' + singular, {id: object.id})
    }
  }
});
