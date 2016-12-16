(function() {
	'use strict';

	angular
	.module('app')
	.controller('TeacherDetailController', TeacherDetailController)

	TeacherDetailController.$inject = ['teacherFactory','$stateParams','$state', 'classFactory'];

	function TeacherDetailController(teacherFactory, $stateParams, $state, classFactory) {
		var vm=this;
		vm.title='TeacherDetailController';
		vm.teacherId= $stateParams.id;
        //vm.classId=$stateParams.id;

		vm.addTeacher = addTeacher;
       vm.deleteTeacher=deleteTeacher;
        //vm.editTeacher=editTeacher;
       
		activate();

		
        function activate() {
          teacherFactory
          .getTeacher($stateParams.id)
          .then(function(response){
            vm.teacher=response.data;

                    vm.teacher.firstName = vm.teacher.name.split(' ')[0]
                    vm.teacher.lastName = vm.teacher.name.split(' ')[1]
          });
        }

        function addTeacher() {
            vm.teacher.name = vm.teacher.firstName + ' ' + vm.teacher.lastName;
                
               if($stateParams.id){

                teacherFactory
                    .updateTeacher(vm.teacher.teacherId, vm.teacher)
                    .then(function(response) {
                        $state.go('teacher.grid');
                    });
                //  classFactory
                //  .getClasses()
                // .then(function(response) {
                //       vm.classes = response.data;
                //      console.log(vm.classes);
                //  })
             
        }
            else {
                vm.teacher.startDate='12/12/12';
                vm.teacher.endDate='12/12/20';
                teacherFactory
                .createTeacher(vm.teacher)
                .then(function(response){
                    $state.go('teacher.grid');
                });
            }
        }

      // function editTeacher(teacher){
      //       teacherFactory
      //       .updateStudent(teacher.teacherId, teacher)
      //       .then(function(response){

      //       })
      //   }

        function deleteTeacher(teacher) {
            teacherFactory
                .removeTeacher(teacher.TeacherId)
                .then(function(response) {
                var index =vm.teachers.indexOf(teacher);
                vm.teachers.splice(index,1);
                })
        }
    }

})();
		
