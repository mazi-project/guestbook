'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-09 13:17:54
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-14 16:35:19
*/

var httpauth = require('http-auth');

var basicAuth = httpauth.basic({
    realm: "Admin"
}, function (username, password, callback) {
	callback(true);
    //callback(username === Config.authName && password === Config.authPassword);
});

module.exports = {
	authentificate : httpauth.connect(basicAuth),
};