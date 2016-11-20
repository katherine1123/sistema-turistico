(function () {
    'use strict';

    angular
            .module('app.dashboard')
            .controller('HotelesController', HotelesController);

    HotelesController.$inject = ['$scope', 'Proveedorinfo'];
    /* @ngInject */
    function HotelesController ($scope, Proveedorinfo) {
        var vm = this;
        Proveedorinfo.listarUsuarios(function (res) {
            $scope.listaHoteles = res;
        });

    }
})();
