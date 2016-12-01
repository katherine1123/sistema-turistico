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
            Usuario.create($scope.user, function (res) {
                LxNotificationService.success('Se registro correctamente');
                $state.go('app.login');
            });
        };
    }
})();
