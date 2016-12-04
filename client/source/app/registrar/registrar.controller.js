(function () {
    'use strict';

    angular
            .module('app.home')
            .controller('RegistrarController', RegistrarController);

    RegistrarController.$inject = ['$scope', '$state', 'Usuario', '$timeout',
        'LxNotificationService'];
    /* @ngInject */
    function RegistrarController ($scope, $state, Usuario, $timeout,
            LxNotificationService) {
        var vm = this;
        $scope.user = {};
        vm.registrarUsuario = function () {
            var obj = {username:$scope.user.email, email:$scope.user.email,
                password: $scope.user.contrasena, nombre: $scope.user['nombre'],
                apellidop: $scope.user['apellido_paterno'],
                apellidom: $scope.user['apellido_materno']};
            Usuario.create(obj, function (res) {
                LxNotificationService.success('Se registro correctamente');
                $state.go('root.login');
            });
        };
    }
})();
