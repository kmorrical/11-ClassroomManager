(function() {
	'use strict';

	angular
	.module('app')
	.controller('TeacherGridController', TeacherGridController)

	TeacherGridController.$inject = ['teacherFactory'];

	function TeacherGridController(teacherFactory) {
		var vm=this;
		vm.title='TeacherGridController';
		vm.deleteTeacher=deleteTeacher;
		vm.teachers=[];

		
		activate();

		function activate() {
		teacherFactory
          .getTeachers()
          .then(function(response){
            vm.teachers=response.data;
          });
      }

                 function deleteTeacher(teacher) {
            	teacherFactory
                .removeTeacher(teacher.teacherId) //make SURE this ID is LOWER CASE 
                .then(function(response) {
                var index =vm.teachers.indexOf(teacher);
                vm.teachers.splice(index,1);
                })
        }


		}


	
})();