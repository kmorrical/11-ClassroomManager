(function() {
        'use strict';

        angular
            .module('app')
            .controller('ClassDetailController', ClassDetailController);

        ClassDetailController.$inject = ['classFactory', '$stateParams', 'teacherFactory', 'studentFactory', '$state'];

        function ClassDetailController(classFactory, $stateParams, teacherFactory, studentFactory, $state) {
            var vm = this;
            vm.title = 'ClassDetailController';

            vm.classId = $stateParams.id;

            vm.addClass = addClass;
            vm.deleteClass = deleteClass;
            vm.teachers = [];
            //vm.editClass = editClass;

            activate();

            ///////



            function activate() {

                classFactory
                    .getClass($stateParams.id)
                    .then(function(response) {
                        vm.classObj = response.data;

                    });
                //drop down broke so trying to fix it
                teacherFactory
                    .getTeachers()
                    .then(function(response) {
                            vm.teachers = response.data;
                        });

                    }



                function addClass() {
                    // vm.class.IsNightClass = false;
                    // vm.class.description="Coding";
                    if ($stateParams.id) {
                        classFactory
                            .updateClass(vm.classObj.classId, vm.classObj)
                            .then(function(response) {
                                $state.go('class.grid');
                            });

                        studentFactory
                            .getStudents()
                            .then(function(response) {
                                vm.students = response.data;
                                console.log(vm.students);
                            })
                    } else {
                        classFactory
                            .createClass(vm.classObj)
                            .then(function(response) {
                                $state.go('class.grid');
                            });

                    }

                }

                // function editClass(classObj) {
                //     classFactory
                //         .updateClass(classObj.classId, classObj)
                //         .then(function(response) {

                //         });
                // }

                function deleteClass(classObj) {
                    classFactory
                        .removeClass(classObj.classId)
                        .then(function(response) {
                            var index = vm.classes.indexOf(classObj);
                            vm.classes.splice(index, 1);
                        })
                }
            }

        })();
