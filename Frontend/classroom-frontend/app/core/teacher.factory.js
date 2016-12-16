(function() {
    'use strict';

    angular
        .module('app')
        .factory('teacherFactory', teacherFactory);

    teacherFactory.$inject = ['$http'];

    function teacherFactory($http) {
        var vm=this;
        var service = {
            createTeacher: createTeacher,
            getTeachers: getTeachers,
            getTeacher: getTeacher,
            updateTeacher: updateTeacher,
            removeTeacher: removeTeacher
                //you use remove instead of delete because it works better
        };
        return service;

        ////////////////////////
        //are these supposed to correlate to what I call my items in sublime/html/
        function createTeacher(teacher) {
            return $http.post('http://localhost:49818/api/teachers', teacher);

        }

        function getTeachers() {
            return $http.get('http://localhost:49818/api/teachers');
        }

        function getTeacher(id) {
            return $http.get('http://localhost:49818/api/teachers/' +id);
        }

        function updateTeacher(id, teacher) {
            return $http.put('http://localhost:49818/api/teachers/' + id, teacher);
            //the todo is the object to be updated
        }

        function removeTeacher(id) {
            return $http.delete('http://localhost:49818/api/teachers/' + id);
        }
    }
})();