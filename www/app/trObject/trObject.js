angular.module('tr.objects', [])
.config(function($stateProvider, $urlRouterProvider) {

  var types = {person: 'people', place: 'places', thing: 'things', emergency: 'emergencies'};

  var media = function(scope, $injector, object, propertyName) {
    var $ionicModal = $injector.get('$ionicModal');

    var modalScope = scope.$new();

    $ionicModal.fromTemplateUrl('app/directives/imagepicker.html', {
      scope: modalScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      scope['modal-' + propertyName] = modal;
      console.log(scope['modal-' + propertyName]);
    })

    var getPicture = function(source) {
      return function() {
        navigator.camera.getPicture(function(data) {
          scope['modal-' + propertyName].hide();
          scope.$apply(function() {
            object[propertyName] = data
          });
        }, function() {console.log('err'); console.log(arguments);}, { quality: 50,
        destinationType: navigator.camera.DestinationType.NATIVE_URI,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true,
        mediaType: navigator.camera.MediaType.PICTURE, // PICTURE
        sourceType: source });
      }
    }

    if (navigator.camera) {
      modalScope.picture = getPicture(navigator.camera.PictureSourceType.CAMERA);
      modalScope.gallery = getPicture(navigator.camera.PictureSourceType.PHOTOLIBRARY);
    }
    return function() {
      scope['modal-' + propertyName].show()
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
        setTitle('List of ' + plural[0].toUpperCase() + plural.slice(1))
        $scope.$on('objectsAdded', function() {
          $scope.objects = objects[plural]();
        });
        $scope.objects = objects[plural]();
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
        setTitle('Create a ' + singular, 'nav.' + plural)
        $scope.save = function(object) {
          objects.add(object);
          $state.go('nav.' + plural);
        }
        $scope.icon = media($scope, $injector, $scope.object, 'icon');
        $scope.attachment = media($scope, $injector, $scope.object, 'attachment');
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
        setTitle('Modify a ' + singular, 'nav.' + plural)
        $scope.object = objects.get($stateParams.id);
        $scope.save = function(object) {
          objects.modify(object);
          $state.go('nav.' + plural);
        }

        $scope.icon = media($scope, $injector, $scope.object, 'icon');
        $scope.attachment = media($scope, $injector, $scope.object, 'attachment');
      }
    }

    var detailState = {
      url: '/'+plural+'/detail/:id',
      views: {}
    };
    detailState.views['nav-'+plural] = {
      templateUrl: 'app/trObject/detail.html',
      controller: function($scope, $stateParams, objects, setTitle) {
        $scope.object = objects.get($stateParams.id);
          setTitle('Detail for ' + $scope.object.name, 'nav.' + plural)
      },
    }

    $stateProvider
      .state('nav.' + plural, listState)
      .state('nav.create-' + singular, createState)
      .state('nav.modify-' + singular, modifyState)
      .state('nav.detail-' + singular, detailState)
  });
}).factory('trObject', function($state) {
  return {
    modify: function(object) {
      var singular = object.type.toLowerCase();
      $state.go('nav.modify-' + singular, {id: object.id})
    },
    detail: function(object) {
      var singular = object.type.toLowerCase();
      $state.go('nav.detail-' + singular, {id: object.id})
    }
  }
});
