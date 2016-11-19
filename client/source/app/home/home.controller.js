(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', 'Proveedor'];
    /* @ngInject */
    function HomeController ($scope, $state, Proveedor) {
        var vm = this;
        vm.buscarDestinos = function () {
            Proveedor.find(function (res) {
                console.log(res);
            });
            $state.go('root.hoteles');
        };
    }
})();
