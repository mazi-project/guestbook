'use strict';

var assert = require('assert');
var fs = require('fs')
var _ = require('underscore')
var async = require('async')

var Submission = r_require('models/submission')
var Comment = r_require('models/comment')

describe('Database Connection Test', function() {

	it('should connect to mongoDB', function(done) {

		var Database = r_require('database/database')

		Database.connect((err) => {
			if (err)
				throw err;
			Database.disconnect();
			done();
		});
	});

});

/* SUBMISSION TESTS */

describe('Database Submission Test', function(){

  	beforeEach(function(done) {

  		r_require('database/database').connect(done);
  	});

  	afterEach(function(done) {
  		async.parallel([
			(callback) => { Submission.removeAll(callback) },
			(callback) => { Comment.removeAll(callback) },
		],() => {
        	r_require('database/database').disconnect();
        	done();
        }); 
    });

	it('should create a database file and add one submission', function(done){

		var submission = new Submission({
			author : "Letterbox",
			device : "letterbox_1",
			tags : [ 'tag_1', 'tag_2'],
			text : 'Test Nachricht',
			files: [ { name: "test.jpg", path: "data/images", filetype: "image" } ],
			location : [45.3989, 34.399]
		})

		submission.save(function(err, model) {
			if (err) throw err;
			done();
		});
	})

	it('should add a submission and return it', function(done){

		var message = require('node-uuid').v4()

		var submission = new Submission({
			text: message,
			author: 'test'
		});

		submission.save(function(err, model) {
			if (err) throw err;
			var objectId = model._id;

			// check if model exists
			Submission.find({ _id: objectId} , function(err, models) {
	        	assert.equal(message,models[0].text)
	        	done();
			});

		});
	})

	it('should match the correct submission count', function(done) {

		// insert some models
		
		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				author: 'test'
			}
		});

		Submission.create(array, function(err,models) {
			Submission.count({}, function(err, count) {
				assert.equal(count,size) // check correct size
				done();
			});
		});
	})

	it('should be able to remove an item', function(done) {

		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				author: 'test'
			}
		});

		Submission.create(array, function(err,models) {
			Submission.remove({ _id: models[0]._id} , function(err) {
				Submission.count({}, function(err,count) {
					assert.equal(count,size-1) // check if one item was removed
					done();
				});
			});
		});
	})

	it('should list all models', function(done) {

		var size = Math.floor(2 + Math.random() * 10)
		var array = _.map(_.range(size), function(i) {
			return {
				text: 'model'+i,
				author: 'test'
			}
		});

		Submission.create(array, function(err) {
			Submission.find({}, function(err,models) {
				assert.equal(models.length,size)
				done();
			})
			
		});
	});
})

/* COMMENTS TESTS */

describe('Database Comments Test', function(){

	var addComment = function(comment_text,callback) {

		var submission = new Submission({
			author : "Letterbox",
			device : "letterbox_1",
			tags : [ 'tag1', 'tag_2'],
			text: 'test',
			text : 'Test Nachricht',
			files: [ { name: "test.jpg", path: "data/images", filetype: "image" } ],
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

  	beforeEach(function(done) {

  		r_require('database/database').connect();

  		// delete databases entries before each test call
  		async.parallel([
  			(callback) => { Submission.removeAll(callback) },
  			(callback) => { Comment.removeAll(callback) },
  		],() => {
  			addComment("Test Comment",() => { done() });
  		})
  	});

  	afterEach(function() {
        r_require('database/database').disconnect();
    });

	it("should be able to add a comment", (done) => {	
		addComment("comment_text",() => { done() });
	});

	it("should be able to list comments from submission", (done) => {
		
		var comment_text = "Lorem_"+require('node-uuid').v4()

		addComment(comment_text,(submissionId) => {
			Submission.findOne({ _id : submissionId }).populate('comments').exec(function(err,model) {
				if (err) throw err;
				assert.equal(model.comments[0].text,comment_text);
				done();
			})
		});
	});

	it("should be able to delete comment", (done) => {
		
		var comment_text = "Lorem";

		addComment(comment_text,(submissionId) => {
			Submission.findOne({ _id : submissionId }).exec(function(err,model) {
				if (err) throw err;

				var commentId = model.comments[0]
				assert(model.comments.length == 1)

				model.removeComment(commentId,(err,model) => {
					if (err) throw err;
					assert(model.comments.length == 0)
					done();

				});				
			});
		});
	});

});

/* HELPERS */