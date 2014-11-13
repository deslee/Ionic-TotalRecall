angular.module('tr.directives', [])

  .directive('trView', function() {
    return {
      templateUrl: 'app/trView/trView.html',
      restrict: 'EA',
      transclude: true
    }
  })
