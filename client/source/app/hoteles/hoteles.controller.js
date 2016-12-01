(function () {
    'use strict';

    angular
            .module('app.dashboard')
            .controller('HotelesController', HotelesController);

    HotelesController.$inject = ['$scope', 'Proveedor-info', '$state'];
    /* @ngInject */
    function HotelesController ($scope, ProveedorInfo, $state) {
        var vm = this;
        $scope.reservar = function (hotel) {
            localStorage.hotel = JSON.stringify(hotel);
            $state.go('root.detalles');
        };
        ProveedorInfo.listarUsuarios(function (res) {
            $scope.listaHoteles = res;
        });
        vm.busqueda = localStorage.busqueda;
    }
})();
