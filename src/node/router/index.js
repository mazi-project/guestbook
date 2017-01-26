'use strict';

var express = require('express');
var bodyParser = require('body-parser');

/* Configure express */

module.exports = function (app) {

    var handleDbConnection = function(req, res, next) {

        var db = r_require('/database/database')
        db.connect();

        // action after response
        var afterResponse = function() {
            db.disconnect();
        }

        //res.on('finish', afterResponse);
        res.on('close', afterResponse);

        next();
    };

    var publicOptions = {
        root: __dirname,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    /* Error Handling */
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
    });

	// serve static content
    if (Config.publicDir) {
        // serve backbone app
        app.use(Config.baseUrl,express.static(Config.publicDir,publicOptions));
        // serve files
        app.use(Config.baseUrl+'files/',express.static(Config.fileDir,publicOptions));
    }

    // connect to database when accessing api routes
    app.use(Config.baseUrl+'api/',handleDbConnection);

    // submission routes
    app.use(Config.baseUrl+'api/submissions', bodyParser.json());
    app.use(Config.baseUrl+'api/submissions', bodyParser.urlencoded({ extended: true }));
    app.use(Config.baseUrl+'api/submissions', require('./submissions'));

    // comment routes
    app.use(Config.baseUrl+'api/comments', bodyParser.json());
    app.use(Config.baseUrl+'api/comments', bodyParser.urlencoded({ extended: true }));
    app.use(Config.baseUrl+'api/comments', require('./comments'));

    // feedback routes
    app.use(Config.baseUrl+'api/feedback', require('./feedback'));

    // tags routes
    app.use(Config.baseUrl+'api/tags', require('./tags'));

    // file routes
    app.use(Config.baseUrl+'api/file', bodyParser.json());
    app.use(Config.baseUrl+'api/file', require('./file'));
};