angular.module('tr.objects', [])
.config(function($stateProvider, $urlRouterProvider) {

  var types = {person: 'people', place: 'places', thing: 'things', emergency: 'emergencies'};

  var icon = function(scope, $injector, object) {

    var $ionicModal = $injector.get('$ionicModal');
    $ionicModal.fromTemplateUrl('app/directives/imagepicker.html', {
      scope: scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      scope.modal = modal;
    })

    var getPicture = function(source) {
      return function() {
        navigator.camera.getPicture(function(data) {
          scope.modal.hide();
          scope.$apply(function() {
            object.icon = "data:image/png;base64," + data
          });
        }, function() {console.log('err'); console.log(arguments);}, { quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL,
        sourceType: source });
      }
    }

    if (navigator.camera) {
      scope.picture = getPicture(navigator.camera.PictureSourceType.CAMERA);
      scope.gallery = getPicture(navigator.camera.PictureSourceType.PHOTOLIBRARY);
    }
    return function() {
      scope.modal.show()
    }
  };

  Object.keys(types).forEach(function(singular) {
    var plural = types[singular];
    var type = singular[0].toUpperCase() + singular.slice(1);

    var listState = {
      url: '/' + plural,
      views: {}
    };
    listState.views['nav-' + plural] = {
      templateUrl: 'app/trObject/list.html',
      controller: function($scope, $state, $injector, objects, trObject, setTitle) {
        $scope.singular = singular;
        setTitle('List of ' + plural)
        $scope.$on('objectsAdded', function() {
          $scope.objects = objects[plural]();
        });
        console.log(objects)
        console.log(plural)
        console.log(objects[plural])
        $scope.objects = objects[plural]();
        console.log($scope.objects)

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
      controller: function($scope, $state, $injector, objects, setTitle) {
        $scope.singular = singular;
        $scope.object = {type: type}
        setTitle('Create a ' + singular)
        $scope.save = function(object) {
          objects.add(object);
          $state.go('nav.' + plural);
        }
        $scope.icon = icon($scope, $injector, $scope.object);
      }
    };

    var modifyState = {
      url: '/'+plural+'/modify/:id',
      views: {}
    }
    modifyState.views['nav-' + plural] = {
      templateUrl: 'app/trObject/form.html',
      controller: function($scope, $state, $injector, $stateParams, objects, setTitle) {
        $scope.singular = singular;
        setTitle('Modify a ' + singular)
        $scope.object = objects.get($stateParams.id);
        $scope.save = function(object) {
          objects.modify(object);
          $state.go('nav.' + plural);
        }
        $scope.icon = icon($scope, $injector, $scope.object);
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
