(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentGridController', StudentGridController)

    StudentGridController.$inject = ['studentFactory'];

    function StudentGridController(studentFactory) {
        var vm = this;
        vm.title = 'StudentGridController';
        vm.deleteStudent = deleteStudent;
        vm.students = [];
        //vm.deleteStudent=deleteStudent;
        activate();

        function activate() {
            studentFactory
                .getStudents()
                .then(function(response) {
                    vm.students = response.data;
                });
        }

        

        function deleteStudent(student) {
            console.log('delete function firing');
            studentFactory
                .removeStudent(student.studentId) //make SURE this ID is LOWER CASE 
                .then(function(response) {
                    var index = vm.students.indexOf(student);
                    vm.students.splice(index, 1);
                    console.log('deleted teacher!')
                })
        }

    }
})();
