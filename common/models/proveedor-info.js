'use strict';

module.exports = function (Proveedorinfo) {
    Proveedorinfo.listarUsuarios = function (cb) {
        var ds = Proveedorinfo.dataSource;
        var sql = 'SELECT * from proveedor as p ' +
                'INNER JOIN proveedor_servicio as ps on ps.proveedor_id = p.id ' +
                'inner JOIN proveedor_info as pi on pi.proveedor_servicio_id = ps.id';

        ds.connector.query(sql, function (err, products) {

            if (err)
                console.error(err);

            cb(err, products);

        });

    }
    Proveedorinfo.remoteMethod('listarUsuarios', {
        returns: {arg: 'data', type: ['proveedor-info'], root: true}
    })
};
