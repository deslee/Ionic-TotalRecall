angular.module('tr.service', [])
  .factory('$localstorage', ['$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key, def) {
        if (!def) {
          def = {}
        }
        return JSON.parse($window.localStorage[key] || JSON.stringify(def));
      }
    }
  }])

  .factory('objects', function($localstorage) {
    var objectsUtil = {
      add: function(object) {
        var objects = $localstorage.getObject('objects', []);
        objects.push(object);
        $localstorage.setObject('objects', objects);
      },
      all: function() {
        return $localstorage.getObject('objects', []);
      }
    }
    var types = ['people', 'places', 'things'];
    types.forEach(function(e) {
      objectsUtil[e] = function search() {
        console.log(objectsUtil.all())
        return objectsUtil.all().filter(function(object) {
          console.log(object.type == e[0].toUpperCase() + e.slice(1))
          return object.type == e[0].toUpperCase() + e.slice(1);
        });
      }
    })
    return objectsUtil;
  })
  ;
