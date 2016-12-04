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
                state: 'root.detalles',
                config: {
                    url: '/detalles',
                    views: {
                        'main@': {
                            templateUrl: 'static/detalles/detalles.html',
                            controller: 'DetallesController as vm'
                        },
                        'sidebar@': {},
                        'breadcrumb@': {}
                    },
                    data: {
                        title: 'Detalles',
                        _class: 'detalles'
                    }
                }
            }
        ];
    }
})();
