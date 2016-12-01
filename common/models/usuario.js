'use strict';

module.exports = function (Usuario) {
    Usuario.ingresar = function (email, contrasena, cb) {
        var ds = Usuario.dataSource;
        var sql = "select nombre, apellido_paterno, apellido_materno, email from usuario" +
                " where email=? and contrasena=?"
        ds.connector.query(sql, [email, contrasena], function (err, usuario) {

            if (err)
                console.error(err);

            cb(err, usuario[0]);

        });
    }
    Usuario.remoteMethod('ingresar', {
        accepts: [
            {arg: 'email', type: 'string', required: true},
            {arg: 'contrasena', type: 'string', required: true}
        ],
        returns: {arg: 'data', root: true}
    })
};
