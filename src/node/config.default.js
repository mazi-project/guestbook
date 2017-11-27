/* CONFIG FILE */

var Config = {
	
		/* DATABASE */
		database: "mongodb://localhost/letterbox",
		submissionCollection: "submissions",
	
		/* FILE UPLOAD */
		uploadDirTmp: '_tmp/',
		fileDir: '../files/',
	
		/* SERVER CONFIG */
		baseUrl : '/', // with trailing /
		publicDir : '../www/',
		hostname : false, // 127.0.0.1 = private, false = public
		port : '8081',
		
		/* TEST CONFIG */
		testDatabase :"mongodb://localhost/letterbox_test",
		testPort: '8881',
		
		/*********** Exposed to the admin ***********/
		
		/* FILE UPLOAD */
		maxFileSize: 1024*1024*2, //in bytes
		allowedFileTypes: ['image/jpg','image/jpeg','image/png','image/gif'],
	
		/* AUTH DATA */
		authName: 'admin',
		authPassword: 'password',
	
		// Look n feel
		submission_name_required: true,	// User name is required for each new comment
	};
	
	module.exports = Config;
	