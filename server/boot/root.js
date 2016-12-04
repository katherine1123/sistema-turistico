'use strict';

module.exports = function (server) {
    // Install a `/` route that returns server status
    var router = server.loopback.Router();
    router.get(['/hoteles','/login','/registrar'], function (req, res) {
        res.setHeader('walt-kat','luv u')
        res.redirect('/');
    });
    server.use(router);
};
