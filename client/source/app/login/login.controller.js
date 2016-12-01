(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$timeout', 'Usuario', 'LxNotificationService'];
    /* @ngInject */
    function LoginController ($state, $timeout, Usuario, LxNotificationService) {
        var vm = this;

        vm.login = login;
        vm.irRegistrarse = function () {
            $state.go('root.registrar');
        };
        var _routeAfterLogin = 'root.hoteles';

        function login (credential) {
            if (vm.loginForm.$invalid) {
                return;
            }
            vm.isRequest = true;
            Usuario.ingresar(vm.credential, _success, _error);
            function _success (data) {
                vm.loginError = null;
                localStorage.usuario = JSON.stringify(data);
                LxNotificationService.success('Bienvenido ' + data.nombre);
                // user was redirect to login page
                if ($state.prev) {
                    $state.go($state.prev.state, $state.prev.params);
                    $state.prev = null;
                } else {
                    $state.go(_routeAfterLogin);
                }
            }

            function _error (message) {
                _setError('error', message);
                vm.isRequest = false;
            }
        }

        function _setError (type, text) {
            vm.loginError = {
                type: type,
                text: text
            };
        }
    }
})();
