(function () {
    'use strict';

    angular
        .module('app.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.registrar',
                config: {
                    url: '/registrar',
                    views: {
                        'main@': {
                            templateUrl: 'static/registrar/registrar.html',
                            controller: 'RegistrarController as vm'
                        },
                        'sidebar@': {},
                        'breadcrumb@': {}
                    },
                    data: {
                        title: 'Registrar',
                        _class: 'registrar'
                    }
                }
            }
        ];
    }
})();
