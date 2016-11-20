(function () {
    'use strict';

    angular
        .module('app.hoteles')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.hoteles',
                config: {
                    url: '/',
                    views: {
                        'main@': {
                            templateUrl: 'static/hoteles/hoteles.html',
                            controller :'HotelesController as vm'
                        },
                        'sidebar@': {},
                        'breadcrumb@': {}
                    },
                    data: {
                        title: 'Lista de hoteles',
                        _class: 'hoteles'
                    }
                }
            }
        ];
    }
})();
