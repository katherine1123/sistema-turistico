(function () {
    'use strict';

    angular
            .module('app.home')
            .controller('DetallesController', DetallesController);

    DetallesController.$inject = ['$scope', '$state', 'Usuario', '$timeout',
        'LxNotificationService', 'LxDialogService'];
    /* @ngInject */
    function DetallesController ($scope, $state, Usuario, $timeout,
            LxNotificationService, LxDialogService) {
        var vm = this;
        vm.dialogId = 'dialog-test';
        $scope.terminarReserva = function () {
            vm.termiado = false;
            LxDialogService.open(vm.dialogId);
            $timeout(function () {
                vm.termiado = true;
            }, 3000);
        };

        if (localStorage.usuario) {
            $scope.user = JSON.parse(localStorage.usuario);
            $scope.user.apellidos = $scope.user['apellido_paterno'] + ' ' +
                    $scope.user['apellido_materno'];
        } else {
            $state.go('root.login');
        }
        vm.listaTarjetas = [
            {id: 1, desc: 'Master Card'},
            {id: 2, desc: 'Visa'},
        ];
        vm.meses = [];
        vm.anos = [];
        for (var i = 1; i <= 12; i++) {
            var x;
            if (i < 10) {
                x = '0' + i;
            } else {
                x = i;
            }
            vm.meses.push(x);
        }
        for (var j = 2016; j <= 2030; j++) {
            vm.anos.push(j);
        }

        $scope.hotel = JSON.parse(localStorage.hotel);
    }
})();
