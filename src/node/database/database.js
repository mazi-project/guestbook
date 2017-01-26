'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 12:55:03
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-04 17:41:19
*/


var mongoose = require('mongoose');
var Utils = r_require('/utils/utils');

module.exports = {

	db : false,

	connect : function(callback) {
		if (mongoose.connection.readyState == 0) { //not yet connected
			this.db = mongoose.connect(Config.database, function(err) {
				if (callback)
					callback(err);
			});
		} else {
			if (callback)
				callback();
		}
	},

	disconnect: function() {
		if (this.db)
			this.db.disconnect();
	}
}
// Connect to database
