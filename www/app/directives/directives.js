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
        var singular = scope.$eval('singular');
        if (attr['showForOnly'].toLowerCase().split(',').filter(function(e) {
          return e == singular
        }).length) {
        }
        else {
          $(elem).hide()
        }
      },

      scope: false
    }
  })
