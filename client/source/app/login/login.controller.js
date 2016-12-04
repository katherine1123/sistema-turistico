(function () {
    'use strict';

    angular
            .module('app.login')
            .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$timeout', 'Usuario', 'LxNotificationService',
        '$rootScope', 'Event'];
    /* @ngInject */
    function LoginController ($state, $timeout, Usuario, LxNotificationService,
        $rootScope, Event) {
        var vm = this;

        vm.login = login;
        vm.irRegistrarse = function () {
            $state.go('root.registrar');
        };
        var action = $state.params.action;

        function logout () {
            localStorage.clear();
            $rootScope.$broadcast(Event.AUTH_LOGOUT);
        }

        if (action === 'logout') {
            logout();
        }
        var _routeAfterLogin = 'root.hoteles';
        vm.credential = {};
        if (localStorage.credenciales) {
            var credenciales = JSON.parse(localStorage.credenciales);
            vm.credential.email = credenciales.email;
            vm.credential.password = credenciales.password;
        }

        function login (credential) {
            if (vm.loginForm.$invalid) {
                return;
            }
            vm.isRequest = true;
            Usuario.login(JSON.stringify(vm.credential), _success, _error);

            function _success (data) {
                $rootScope.$broadcast(Event.AUTH_LOGIN, data.user);
                vm.loginError = null;
                localStorage.usuario = JSON.stringify(data.user);
                LxNotificationService.success('Bienvenido ' + data.user.nombre);
                // user was redirect to login page
                if ($state.prev) {
                    $state.go($state.prev.state, $state.prev.params);
                    $state.prev = null;
                } else {
                    $state.go(_routeAfterLogin);
                }
            }

            function _error (message) {
                _setError('error', 'Usuario invalido');
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
