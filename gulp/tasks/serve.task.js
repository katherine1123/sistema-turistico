module.exports = function (gulp, config, $, args) {

    var browserSync = require('browser-sync');
    var port = process.env.PORT || config.browserSync.defaultPort;
    var historyApiFallback = require('connect-history-api-fallback');
    var nodemon = require('gulp-nodemon');
    var DELAY_SYNC = 2000;
    gulp.task('nodemon', function (cb) {
        var called = false;
        return nodemon({
            script: 'server/server.js',
            watch: ['*.*'],
            ignore: ['client/', 'archivos/']
        }).on('start', function onStart () {
            // ensure start only got called once
            if (!called) {
                cb();
            }
            called = true;
        }).on('restart', function onRestart () {
            // reload connected browsers after a slight delay
            setTimeout(function reload () {
                browserSync.reload({
                    stream: false
                });
            }, DELAY_SYNC);
        });
    });
    /**
     * serve the development environment
     * --mock: inject mock files
     */
    gulp.task('serve:dev', ['build:dev', 'nodemon'], function () {
        startBrowserSync(true);
    });

    /**
     * serve the production environment
     * --mock: inject mock files
     */
    gulp.task('serve:prod', ['build:prod', 'nodemon'], function () {
        startBrowserSync(false);
    });

    ///////////

    function startBrowserSync (isDev) {
        if (browserSync.active) {
            return;
        }
        config.fn.log('Starting BrowserSync on port ' + port);

        // only watch files for development environment
        var watchedFiles = [].concat(
            config.js.app.source,
            config.css.singleSource,
            config.html.source,
            config.templateCache.sourceJade
        );
        if (args.mock) {
            watchedFiles = watchedFiles.concat(config.js.test.stubs);
        }
        if (isDev) {
            gulp.watch(watchedFiles, ['build:dev', browserSync.reload])
                .on('change', changeEvent);
        }

        var options = {
            port: port,
            proxy: 'localhost:3000',
            online: false,
            logLevel: 'info',
            logPrefix: 'kat',
            serveStatic: ['client/build/dev']
        };

        browserSync(options);
    }

    function changeEvent (event) {
        var srcPattern = new RegExp('/.*(?=/' + config.client.source + ')/');
        config.fn.log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }

};
