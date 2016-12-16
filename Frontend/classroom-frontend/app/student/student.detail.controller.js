(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = ['studentFactory', '$stateParams', '$state', 'classFactory'];

    function StudentDetailController(studentFactory, $stateParams, $state, classFactory) {
        var vm = this;
        vm.title = 'StudentDetailController';
        //vm.classId = $stateParams.id;
        vm.studentId=$stateParams.id;
        vm.addStudent = addStudent;
        vm.deleteStudent = deleteStudent;
        vm.classes=[];
      //  vm.editStudent = editStudent;


        activate();

        ///////


        function activate() {
           
            studentFactory
                .getStudent($stateParams.id)
                .then(function(response) {
                    vm.student = response.data;

                    vm.student.firstName = vm.student.name.split(' ')[0]
                    vm.student.lastName = vm.student.name.split(' ')[1]
                });
                // classFactory
                //  .getClass($stateParams.id)
                // .then(function(response) {
                //       vm.classObj = response.data;
                     
                //  });
        }

    

        function addStudent() {

        	vm.student.name = vm.student.firstName + ' ' + vm.student.lastName;

            if ($stateParams.id){
            studentFactory
                .updateStudent(vm.student.studentId, vm.student)
                .then(function(response) {
                    $state.go('student.grid');
                });
                   
                      classFactory
                  .getClass($stateParams.id)
                 .then(function(response) {
                      vm.classObj = response.data;
                     
                  });
        } 
        else {
            
            studentFactory
                .createStudent(vm.student)
                .then(function(response) {
                    $state.go('student.grid');
                });
        }
    }

        // function editStudent(student) {
        //     studentFactory
        //         .updateStudent(student.StudentId, student)
        //         .then(function(response) {

        //         })
        // }

        function deleteStudent(student) {
            studentFactory
                .removeStudent(student.StudentId)
                .then(function(response) {
                    var index = vm.students.indexOf(student);
                    vm.students.splice(index, 1);
                })
        }
    };

})();
