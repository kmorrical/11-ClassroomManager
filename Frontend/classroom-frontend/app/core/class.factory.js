(function() {
    'use strict';

    angular
        .module('app')
        .factory('classFactory', classFactory);

    classFactory.$inject = ['$http'];

    function classFactory($http) {
        var service = {
            createClass: createClass,
            getClasses: getClasses,
            getClass: getClass,
            updateClass: updateClass,
            removeClass: removeClass
                //you use remove instead of delete because it works better
        };
        return service;

        ////////////////////////
        //are these supposed to correlate to what I call my items in sublime/html/
        function createClass(classObj) {
            return $http.post('http://localhost:49818/api/classes', classObj);
        }

        function getClasses() {
            return $http.get('http://localhost:49818/api/classes');
        }

        function getClass(id) {
            return $http.get('http://localhost:49818/api/classes/' + id);
        }

        function updateClass(id, classObj) {
            return $http.put('http://localhost:49818/api/classes/' + id, classObj);
            //the classobj is the object to be updated
        }

        function removeClass(id) {
            return $http.delete('http://localhost:49818/api/classes/' + id);
        }
    }
})();