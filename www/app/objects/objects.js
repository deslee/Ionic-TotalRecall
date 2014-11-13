angular.module('tr.objects', [])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('nav.manage-object', {
      url: '/object/:crud?type&id',
      views: {
        'nav-create-object': {
          templateUrl: 'app/objects/create-object.html',
          controller: function($scope, $localstorage, $state, $stateParams, objects) {
            $scope.crud = $stateParams.crud;

            $scope.availableTypes = ['People', 'Places', 'Things'];
            $scope.object = {type: $stateParams.type || undefined};

            var page = $scope.$eval('navPage');


            if ($scope.crud == 'modify') {
            page.subtitle = 'Modify Object'
              $scope.object = objects.get($stateParams.id);
              console.log($scope.object)
            }
            else {
            page.subtitle = 'Create Object'
            }

            $scope.create = function(object) {
              if ($scope.crud == 'create') {
                objects.add(object);
              }
              else {
                objects.modify(object);
              }
              $state.go('nav.' + object.type.toLowerCase());
            }
          }
        }
      }
    })
});
