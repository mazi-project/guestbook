/* CONFIG FILE */

var Config = {

	/* DATABASE */
	database: "mongodb://localhost/letterbox",
	submissionCollection: "submissions",

	/* FILE UPLOAD */
	uploadDirTmp: '_tmp/',
	fileDir: '../files/',
	maxFileSize: 1024*1024*2, //in bytes
	allowedFileTypes: ['image/jpg','image/jpeg','image/png','image/gif'],

	/* SERVER CONFIG */
	baseUrl : '/', // with trailing /
	publicDir : '../www/',
	hostname : false, // 127.0.0.1 = private, false = public
	port : '8081',

	/* AUTH DATA */
	authName: 'admin',
	authPassword: 'password',

	/* TEST CONFIG */
	testDatabase :"mongodb://localhost/letterbox_test",
	testPort: '8881'

};

module.exports = Config;