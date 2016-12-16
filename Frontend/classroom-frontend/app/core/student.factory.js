(function() {
    'use strict';

    angular
        .module('app')
        .factory('studentFactory',studentFactory);

    studentFactory.$inject = ['$http'];

    function studentFactory($http) {
        var vm=this;
        var service = {
            createStudent: createStudent,
            getStudents: getStudents,
            getStudent: getStudent,
            updateStudent: updateStudent,
            removeStudent: removeStudent
                //you use remove instead of delete because it works better
        };
        return service;

        ////////////////////////
        //are these supposed to correlate to what I call my items in sublime/html/
        function createStudent(student) {
            return $http.post('http://localhost:49818/api/students', student);

        }

        function getStudents() {
            return $http.get('http://localhost:49818/api/students');
        }

        function getStudent(id) {
            return $http.get('http://localhost:49818/api/students/' + id);
        }

        function updateStudent(id, student) {
            return $http.put('http://localhost:49818/api/students/' + id, student);
            //the todo is the object to be updated
        }

        function removeStudent(id) {
            return $http.delete('http://localhost:49818/api/students/' + id);
        }
    }
})();