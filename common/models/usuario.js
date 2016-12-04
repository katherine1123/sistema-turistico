'use strict';

module.exports = function(Credencial) {
    Credencial.beforeRemote('create', function(ctx,un,next){

        if(!ctx.args.data.credentials){
            ctx.args.data.credentials = {}
        }
        if(!ctx.args.data.challenges){
            ctx.args.data.challenges = {}
        }
        if(!ctx.args.data.status){
            ctx.args.data.status = '1'
        }
        if(!ctx.args.data.realm){
            ctx.args.data.realm = '1'
        }
        if(!ctx.args.data.lastUpdated){
            ctx.args.data.lastUpdated = new Date()
        }
        console.log(ctx.args);
        next()
    })
};
