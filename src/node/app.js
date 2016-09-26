'use strict';

/* 
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-01-25 11:08:47
* @Last Modified by:   lutzer
* @Last Modified time: 2016-09-09 12:46:49
*/

module.exports = {

	initialize: function() {

		/* use absolute paths for require */
		global.r_require = function(name) {
		    return require(__dirname + name);
		}

		/* register config as global var */
		global.Config = r_require('/config.js');

		/* alias for printing */
		global.print = function(string,namespace) {
			var namespace = (typeof namespace !== 'undefined') ?  namespace : 'INFO';
			
			console.log(namespace+':'+string);
		}

		/* if startet as test server, change to test database */
		if (process.argv[2] == 'test') { 
			Config.database = Config.testDatabase
			Config.port = Config.testPort
			//print = function() {}; //turn of printing
		}

		/*Define dependencies.*/

		var express = require('express');
		var app = express();
		var http = require('http').Server(app);

		/* Load Sockets */

		var sockets = r_require('/sockets')(http);

		/* Load Router */

		var router = r_require('/router')(app);

		/* Run the server */

		http.listen(Config.port,Config.hostname,function(){
		    print("Node Server listening on "+Config.hostname+":"+Config.port);
		});

	}
}

