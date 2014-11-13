angular.module('tr.directives', [])

  .directive('trView', function() {
    return {
      templateUrl: 'app/directives/trView.html',
      restrict: 'EA',
      transclude: true
    }
  })
