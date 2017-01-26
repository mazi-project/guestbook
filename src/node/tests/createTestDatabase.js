'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-10 11:51:25
* @Last Modified by:   lutzer
* @Last Modified time: 2016-07-01 17:24:47
*/


var assert = require('assert');
var fs = require('fs')
var _ = require('underscore')
var async = require('async')

var Submission = r_require('models/submission')
var Comment = r_require('models/comment')

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl
var TEST_FILES = ['tests/files/img1.jpg','tests/files/img2.jpg','tests/files/img3.jpg']

/* TEST DATABASE */

describe('Create Test Database', function(){

  	before(function(done) {
  		r_require('database/database').connect( () => {
	        done();
	    });
  	});

  	after(function() {
    	r_require('database/database').disconnect();
    });

    var addSubmissionWithComment = function(comment_text,callback) {

		var submission = new Submission({
			author : "Kommentar-Peter",
			device : "mobile",
			tags : [ 'tag1', 'comments'],
			text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed nulla vel risus sodales volutpat. Vestibulum congue ex et mi venenatis facilisis. Donec venenatis molestie fermentum. Duis placerat tortor sed iaculis posuere. Duis faucibus ex sed amet.',
			files: [],
			location : [45.3989, 34.399]
		})

		//first insert submission
		submission.save((err, model) => {
			if (err) throw err;

			//create comment
			var comment = new Comment({
				text: comment_text,
				author: "Peter",
				submission_id: model._id
			})
			
			//add comment
			model.addComment(comment,(err) => {
				if (err) throw err;

				callback(model._id);
			})
		});
	}

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

    it('should add a random number of submissions', function(done) {

		var names = ['Tim','Peter','Hilde','Gabi'];
		var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis pharetra odio. Donec semper orci et metus rhoncus tristique. Fusce eleifend purus purus, sed auctor est tincidunt tincidunt. Mauris tellus lectus, dictum sed diam eu, gravida suscipit ex. Fusce suscipit lorem non eleifend iaculis. Nullam purus tellus, maximus sit amet tempus facilisis, bibendum quis nisl. Fusce eget euismod turpis. Nullam in tortor purus. Integer quis tincidunt est. Cras mi lorem, egestas sit amet felis sit amet, porttitor ornare orci.";

		// Add some Models
		var size = Math.floor(10 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: text,
				author: names[Math.floor(Math.random() * names.length)],
				title: "Liebe Sonnenallee ... "
			}
		});
		Submission.create(array, function(err,models) {
			done();
		});
	});

	it('should add several submissions', function(done){

		var submission = new Submission({
			author : "Letterbox",
			device : "letterbox_1",
			tags : [ 'tag1', 'tag2'],
			text : 'Ut eleifend tellus ut tellus euismod bibendum. Nam id urna blandit, dignissim massa in, ultrices diam. Curabitur a malesuada eros, nec maximus orci. Sed at maximus eros.',
			files: [],
			location : [45.3989, 34.399]
		})

		submission.save(function(err, model) {
			if (err) throw err;

			var submission = new Submission({
				author : "Letterbox",
				device : "letterbox_1",
				tags : [ 'tag1', 'testtag'],
				text : 'Suspendisse malesuada commodo sapien tempus laoreet',
				files: [],
				location : [45.3989, 34.399]
			})

			submission.save(function(err, model) {
				if (err) throw err;
				done();
			});
		});

		
	});

	it('should add several submission with comments', function(done){

		addSubmissionWithComment('Nunc blandit aliquam tempus. Ut quis dolor odio. Suspendisse malesuada commodo sapien tempus laoreet. Aliquam blandit eleifend sem', () => {
			addSubmissionWithComment('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque velit lectus, cursus porta mi a, lobortis facilisis purus. Mauris in magna ac orci rhoncus bibendum et eu leo', () => {
				addSubmissionWithComment('Nullam consectetur purus sit amet elementum gravida.', () => {
					done();
				});
			});
		});
	});

	it('should add a files to submission 0', function(done) {

		Submission.find({}, (err,models) => {

			var submissionId = models[0]._id;
			postFile(submissionId,TEST_FILES[0], function(submission) {
				var submissionId = models[3]._id;
				postFile(submissionId,TEST_FILES[1], function(submission) {
					done();
				});
			});
		})
	});

	it('should add two files to submission 1', function(done) {

		Submission.find({}, (err,models) => {

			var submissionId = models[1]._id;
			postFile(submissionId,TEST_FILES[0], function(submission) {
				postFile(submissionId,TEST_FILES[1], function(submission) {
					done();
				});
			});
		})
	});

	it('should add a file to submission 2', function(done) {

		Submission.find({}, (err,models) => {

			var submissionId = models[2]._id;
			postFile(submissionId,TEST_FILES[2], function(submission) {
				done();
			});
		})
	});

	
})