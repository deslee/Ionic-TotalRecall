angular.module('tr.directives', [])

  .directive('trView', function() {
    return {
      templateUrl: 'app/directives/trView.html',
      restrict: 'EA',
      transclude: true
    }
  })

  .directive('showForOnly', function() {
    return {
      link: function(scope, elem, attr) {
        var singular = scope.singular;
        if (attr['showForOnly'].toLowerCase().split(',').filter(function(e) {
          return e == singular.toLowerCase()
        }).length) {
        }
        else {
          $(elem).hide()
        }
      },

      scope: {
        singular: '=singular'
      }
    }
  })

  .directive('trObjectComponent', function() {
    return {
      templateUrl: 'app/directives/trObjectComponent.html',
      controller: function($scope) {
      },
      restrict: 'E',
      scope: {
        object: '=trObject',
        modify: '=modify',
        delete: '=delete',
        detail: '=detail'
      }
    }
  })
