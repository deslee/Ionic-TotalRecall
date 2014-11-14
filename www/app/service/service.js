var types = {person: 'people', place: 'places', thing: 'things'};

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

  .constant('types', types)

  .factory('objects', function($localstorage, $rootScope) {
    var objectsUtil = {
      add: function(object) {
        var id = $localstorage.get('id', 0);
        object.id = ++id;
        $localstorage.set('id', id);
        var objects = $localstorage.getObject('objects', []);
        objects.push(object);
        $localstorage.setObject('objects', objects);
        $rootScope.$broadcast('objectsAdded');
      },
      get: function(id) {
        var results = objectsUtil.all().filter(function(o) {return o.id == id});
        if (results.length > 0) {
          return results[0];
        }
        return null
      },
      modify: function(object) {
        var objects = objectsUtil.all().map(function(o) {
          if (o.id == object.id) {
            return object;
          }
          return o;
        });
        $localstorage.setObject('objects', objects);
        $rootScope.$broadcast('objectsAdded');
      },
      delete: function(id) {
        var objects = objectsUtil.all().filter(function(o) {return o.id != id});
        $localstorage.setObject('objects', objects);
        $rootScope.$broadcast('objectsAdded');
      },
      all: function() {
        return $localstorage.getObject('objects', []);
      },
      emergencies: function() {
        return objectsUtil.all().filter(function(o) {
          console.log(o)
          return Boolean(o.emergency);
        });
      }
    }
    Object.keys(types).forEach(function(type) {
        var singular = type;
        var plural = types[singular];
        objectsUtil[plural] = function search() {
          return objectsUtil.all().filter(function(object) {
            return object.type == singular[0].toUpperCase() + singular.slice(1);
          });
        }
    })
    return objectsUtil;
  })

  .factory('setTitle', function($rootScope) {
    return function(subtitle, back) {
      if (!$rootScope.navPage) {
        $rootScope.navPage = {}
      }
      if (subtitle) {
        $rootScope.navPage.subtitle = subtitle;
      }
      $rootScope.navPage.hasBack = Boolean(back);
      $rootScope.navPage.previousState = back;
    }
  })
  ;
