'use strict';

var assert = require('assert');
var _ = require('underscore');

var Submission = r_require('models/submission');

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl
var TEST_FILES = ['tests/files/img1.jpg','tests/files/img2.jpg']
var DST_PATH = 'tests/files/test.jpg'

describe('File upload', function() {

	before(function(done) {
		r_require('database/database').connect(done);
  	});

  	after(function(done) {

		Submission.removeAll(() => {
			r_require('database/database').disconnect();
			done();
		});
    });

    it('should be able to copy file', function(done) {

		var fse = require('fs-extra');

    	fse.copy(TEST_FILES[0],DST_PATH, (err) => {
    		if (err) throw err;
    		done();
    	});
    });

    it('should be able to remove file', function(done) {

    	var fse = require('fs-extra');

    	//copy file
    	fse.copy(TEST_FILES[0],DST_PATH, (err) => {
    		if (err) throw err;

    		//remove file
    		fse.remove(DST_PATH, (err) => {
    			if (err) throw err;
    			done();
    		});
    	});
    });

    var postFile = function(submissionId,file,callback) {

    	var request = require('supertest');
    	var fs = require('fs');

    	request(BASE_URL).post('api/file/attach/'+submissionId).attach('file', file).end(function(err, res) {
			if (err) throw err;

			var submission = res.body;

			//check if file exists
			fs.access(_.last(submission.files).path, fs.F_OK, (err) => {
				if (err) throw err;
				callback(submission);
			});
		});

    };

	it('should POST a file on api/file/attach/:submissionId', function(done) {

		var request = require('supertest');
		var fs = require('fs');

		var data = {
			text: "unittest_" + require('node-uuid').v4(),
			author: 'Test Peter'
		}

		//create submission
		request(BASE_URL).post('api/submissions').send(data).end(function(err, res) {
			if (err)
    			throw err;
			var submissionId = res.body._id;

			//attach file
			postFile(submissionId,TEST_FILES[0], function() {
				done();
			});
        });

	});

	it('should delete uploaded file on DELETE api/submissions/:submissionId', function(done) {

		var request = require('supertest');
		var fs = require('fs');

		var data = {
			text: "unittest_" + require('node-uuid').v4(),
			author: 'Test Peter'
		}

		//create submission
		request(BASE_URL).post('api/submissions').send(data).end(function(err, res) {
			if (err)
    			throw err;
			var submissionId = res.body._id;

			//attach file
			postFile(submissionId,TEST_FILES[0], function(submission) {
				//delete submission
				request(BASE_URL).delete('api/submissions/'+submissionId).auth(Config.authName, Config.authPassword).end(function(err, res) {
					if (err)
    					throw err;

    				//test if file exists
					fs.access(submission.files[0].path, fs.F_OK, (err) => {
						assert(err != null); //expect an error
						done();
					});
				});
			});	
        });

	});

	it('should check if file url is accesible', function(done) {

		var request = require('supertest');
		var fs = require('fs');

		var data = {
			text: "unittest_" + require('node-uuid').v4(),
			author: 'Test Peter'
		}

		//create submission
		request(BASE_URL).post('api/submissions').send(data).end(function(err, res) {
			if (err)
    			throw err;
			var submissionId = res.body._id;

			//attach file
			postFile(submissionId,TEST_FILES[0], function(submission) {

				//check if file exists
				request(BASE_URL).get('files/'+submission._id+'/'+submission.files[0].name).expect(200).end(function(err, res) {
					if (err)
    					throw err;
    				done();
				});
			});
        });

	});

	it('should be able to post multiple files to one submission', function(done) {
		var request = require('supertest');
		var fs = require('fs');
		var async = require('async');

		var data = {
			text: "unittest_" + require('node-uuid').v4(),
			author: 'Test Peter'
		}

		//create submission
		request(BASE_URL).post('api/submissions').send(data).end(function(err, res) {
			if (err)
    			throw err;
			var submission = res.body;

			//attach files
			async.eachSeries(TEST_FILES, (file,callback) => {
				postFile(submission._id,file, function() {
					callback();
				});
			} ,() => {
				//get answer
				request(BASE_URL).get('api/submissions/'+submission._id).end(function(err, res) {

					var submission = res.body;
					assert.equal(submission.files.length,TEST_FILES.length)
					done();
				})
				
			})
		});	
	});

});